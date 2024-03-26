import React from 'react'

const Welcome = () => {
  return (
    <div className='px-10 py-5'>
        <p className='font-bold text-5xl text-purple-900'>Disease Detection using Machine Learning 🧠💻</p>
        <div className='p-16'>

            <ul className='list-disc space-y-3'>
                <li className='text-xl'>An intelligent web tool proficient in detecting <b>Heart disease, Parkinson’s, and diabetes, employing Machine learning algorithms, SVM and logistic regression.</b></li>
                <li className='text-xl'>Facilitates effortless health monitoring, <b> ensuring an 80% accuracy in disease detection leveraging libraries NumPy, scikit-learn, and Pickle.</b></li>
                <li className='text-xl'>Launched the complete solution on the web using <b>AWS and Docker</b>, with <b>React making it pretty on the front, and Django doing the heavy lifting on the back.</b></li>

            </ul>
        </div>
        <div className='bg-purple-200 p-5 text-purple-800 font-bold text-xl rounded-2xl'>
            Select one of the options from the left to check if you may have a particular condition. <br /> Take the first step towards understanding your health status by selecting one of the options.  <br /> Let's prioritize your well-being together 😊
        </div>
    </div>
  )
}

export default Welcome