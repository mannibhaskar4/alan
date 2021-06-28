import React, { useEffect, useState } from 'react';  
import alanBtn from '@alan-ai/alan-sdk-web';

import wordsToNumbers from 'words-to-numbers';

import NewsCards from './components/NewsCards/NewsCards';
// import classes from '*.module.css';
import useStyles from './styles.js'

const alanKey = 'b847aa43a5ceb2b0f0b16fb7548295c22e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {


    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle]=useState(-1);
    const classes = useStyles();

    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles, number }) => {
                if(command === 'newHeadlines'){
                    // alert('this code was exceuted');
                    // console.log(articles);

                    setNewsArticles(articles);
                    setActiveArticle(-1);

                }else if(command === 'highlight'){
                    setActiveArticle((prevActiveArticle)=> prevActiveArticle + 1);
                }else if(command === 'open'){
                    // console.log(number);
                    const parsedNumber = number.length >2 ? wordsToNumbers(number, {fuzzy: true }) : number;
                    const article =articles[parsedNumber -1];

                    if(parsedNumber > 20){
                        alanBtn().playText('Please try that again');

                    }else{
                        window.open(article.url, '_blank');
                        alanBtn().playText("Opening...");
                    }

                    
                }
            }
        })
    }, [])


    return(
        <div>
            <div className={classes.logoContainer} >
                <img src="https://voicebot.ai/wp-content/uploads/2019/10/alan.jpg" className={classes.alanLogo} alt="alan logo" />
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
        </div>
    );
}
export default App;