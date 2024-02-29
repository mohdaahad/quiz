import {React,useEffect,useState} from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "../defaultV2.min.css";
import "../index.css";
import { useNavigate,useParams  } from 'react-router-dom';
import axios from 'axios';

function SurveyComponent() {
  const { courseId } = useParams();
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [json, setjson] = useState('');
    axios.defaults.withCredentials = true;
    useEffect(() => {
      const fetchData = async () => {
        
        try {
      
        
  
          // Second request using the obtained IP
          const responseQuiz = await axios.get(`https://quiz-4.onrender.com/valid`, { withCredentials: true });
          if (responseQuiz.data.valid) {
            setId(responseQuiz.data.id);
          } else {
            navigate('/sign-in');
          }
    
          // Third request using the obtained IP
          const responseJson = await axios.get(`https://quiz-4.onrender.com/json?courseId=${courseId}`, { withCredentials: true });

          if (responseJson.data) {
            setjson(responseJson.data);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchData();
    }, [navigate,courseId]);
    const survey = new Model(json);
    if(JSON.stringify(json.pages)){
      const quizData = JSON.parse(JSON.stringify(json.pages));
      survey.onComplete.add((sender, options) => {
        const quizResults = sender.data;
        const quizResult = {};
        let answerArr = [];
        quizData.forEach(page => {
            const radioGroupElementsOnPage = page.elements.filter(element => element.type === 'radiogroup');
            radioGroupElementsOnPage.forEach(element => {
                const questionName = element.name;
                const userAnswer = quizResults[questionName];
                const userAnswerText = element.choices.find(choice => choice.value === userAnswer)?.text || "Not found";
                const correctAnswer = element.correctAnswer;
                const quizId = element.quiz_id;
                const answerobj = {questionName : element.title,userAnswer:userAnswerText,correctAnswer:correctAnswer,quizId: quizId}
                answerArr.push(answerobj)
                if (userAnswerText === correctAnswer) {
                    quizResult[questionName] = true;
                } else {
                    quizResult[questionName] = false;
                }
            });

        });
        const score = Object.values(quizResult).filter(Boolean).length;
        axios.post(`https://quiz-4.onrender.com/attempts`,{
          user_id:id,
          total_score:score,
          course_id:courseId
         }).then((response) => {
          if(response.data.message){
            console.log(response.data.message)
          }else{
            const attemptId = response.data.attemptId; // Adjust the property name based on your server response
              if (attemptId) {     
               for(let i=0;i<answerArr.length;i++){
                axios.post(`https://quiz-4.onrender.com/results`, {
                  attempt_id: attemptId,
                  quiz_id:answerArr[i].quizId,
                  selected_option:answerArr[i].userAnswer,
                  is_correct:answerArr[i].correctAnswer
                  
                })
                .then((resultResponse) => {
                  // console.log(resultResponse.data);
                }).catch((resultError) => {
                  console.error('Error saving quiz results:', resultError);
                });
               }
              
      }
          navigate(`/summary/${attemptId}`);
        }}).catch((error) => {
          // Handle errors here
          console.error('Error creating attempt:', error);
        });


    });

    }
 
   
    return (<Survey model={survey} />);
}

export default SurveyComponent;