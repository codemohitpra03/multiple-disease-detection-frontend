import { useFormik } from 'formik'
import React from 'react'
import instructions from '../../assets/instructions.png'
import * as Yup from "yup"
import { useState } from 'react'
const Heart = () => {
    
    
    const formik = useFormik({
        // [60,1,0,130,253,0,1,144,1,1.4,2,1,3]
		initialValues: {
            age:"60",
            sex:"1",
            cp:"0",
            trestbps:"130",
            chol:"253",
            fbs:"0",
            restecg:"1",
            thalach:"144",
            exang:"1",
            oldpeak:"1.4",
            slope:"2",
            ca:"1",
            thal:"3"
        },
		validationSchema: Yup.object({
			age: Yup.string()
                .min(2, "Too Short!")
                .max(90, "Too Long!")
                .required("Age of the patient (in years)"),
            sex: Yup.string()
                .min(0, "Gender of the patient (0 = female, 1 = male)")
                .max(1, "Gender of the patient (0 = female, 1 = male)")
                .required("Gender of the patient (0 = female, 1 = male)"),
            cp: Yup.string()
                .min(0, "Chest pain type")
                .max(1, "Chest pain type")
                .required("Chest pain type (0 = typical angina, 1 = atypical angina, 2 = non-anginal pain, 3 = asymptomatic)"),
            trestbps: Yup.string()
                .required("Resting blood pressure (in mm Hg)"),
            chol: Yup.string()
                .required("Serum cholesterol level (in mg/dl)"),
            fbs: Yup.string()
                .required("Fasting blood sugar > 120 mg/dl (1 = true, 0 = false)"),
            restecg: Yup.string()
                .required("Resting electrocardiographic results"),
            thalach: Yup.string()
                .required("Maximum heart rate achieved (in beats per minute)"),
            exang: Yup.string()
                .required("Exercise induced angina"),
            oldpeak: Yup.string()
                .required("ST depression induced by exercise relative to rest"),
            slope: Yup.string()
                .required("The slope of the peak exercise ST segment"),
            ca: Yup.string()
                .required("Number of major vessels (0-3) colored by fluoroscopy"),
            thal: Yup.string()
                .required("Thalassemia type"),
            
		}),
        onSubmit: async (values) => {
			// alert("Form submitted for user - " + values.age + " " + values.sex)
            document.getElementById('loading').style.display = 'block';
            
            let data = values;
            function convertToNumber(value) {
                const parsedValue = parseFloat(value);
                return isNaN(parsedValue) ? null : parsedValue;
            }
            
            // Convert values to numbers
            for (let key in data) {
                data[key] = convertToNumber(data[key]);
            }
            // console.log(data);
            const response = await fetch("http://multiple-disease-detection-env.eba-mdcr382y.ap-south-1.elasticbeanstalk.com/api/heart/",
            {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    // "input_arrays":[60,1,0,130,253,0,1,144,1,1.4,2,1,3]
                    "input_arrays":Object.values(data).map(convertToNumber)
                })
            })

            const json = await response.json();
            // console.log(json);
            document.getElementById('loading').style.display = 'none';

            if(json.result){
                document.getElementById("yes").style.display = "block"
                document.getElementById("no").style.display = "none"
            }else{
                document.getElementById("yes").style.display = "none"
                document.getElementById("no").style.display = "block"

            }
            
        }
	})
	
	const isFormValid = formik.isValid && Object.keys(formik.touched).length > 0
    
    function openNav() {
        document.getElementById("myNav").style.width = "100%";
      }
      
      /* Close when someone clicks on the "x" symbol inside the overlay */
      function closeNav() {
        document.getElementById("myNav").style.width = "0%";
      }
    return (
        <div className='h-[100vh] bg-gray-50 p-16 overflow-auto'>
            <div id="myNav" className="overlay h-full w-0 fixed z-10 left-0 top-0 overflow-x-hidden duration-500 bg-[rgb(0,0,0,0.99)]">




                <a href={void(0)} className="closebtn cursor-pointer absolute top-5 right-11 text-7xl text-white" onClick={closeNav} >&times;</a>
                <div className="overlay-content relative top-[25%] w-full flex justify-center items-center mt-7 text-white">
                    <ul className='space-y-5 my-5 pl-20'>
                        <p className='font-bold text-4xl'>Decription of each field</p>
                
                        <li><strong>Age:</strong> Age of the patient (in years)</li>
                        <li><strong>Gender:</strong> Gender of the patient (0 = female, 1 = male)</li>
                        <li><strong>Chest Pain Type:</strong> Chest pain type (0 = typical angina, 1 = atypical angina, 2 = non-anginal pain, 3 = asymptomatic)</li>
                        <li><strong>Resting Blood Pressure:</strong> Resting blood pressure (in mm Hg)</li>
                        <li><strong>Serum Cholesterol:</strong> Serum cholesterol level (in mg/dl)</li>
                        <li><strong>Fasting Blood Sugar:</strong> Fasting blood sugar &gt; 120 mg/dl (1 = true, 0 = false)</li>
                        <li><strong>Resting Electrocardiographic Results:</strong> Resting electrocardiographic results (0 = normal, 1 = having ST-T wave abnormality, 2 = showing probable or definite left ventricular hypertrophy)</li>
                        <li><strong>Maximum Heart Rate Achieved:</strong> Maximum heart rate achieved (in beats per minute)</li>
                        <li><strong>Exercise Induced Angina:</strong> Exercise induced angina (1 = yes, 0 = no)</li>
                        <li><strong>ST Depression Induced by Exercise:</strong> ST depression induced by exercise relative to rest</li>
                        <li><strong>Slope of Peak Exercise ST Segment:</strong> The slope of the peak exercise ST segment (0 = upsloping, 1 = flat, 2 = downsloping)</li>
                        <li><strong>Number of Major Vessels Colored by Fluoroscopy:</strong> Number of major vessels (0-3) colored by fluoroscopy</li>
                        <li><strong>Thalassemia Type:</strong> Thalassemia type (3 = normal, 6 = fixed defect, 7 = reversible defect)</li>


                    </ul>

                </div>

            </div>

            <div className='flex items-center justify-between'>
                <p className='font-bold text-2xl'>
                    Enter Details
                </p>
                <div className='flex items-center space-x-2 justify-end cursor-pointer'>
                    <img src={instructions} width={25} alt="" />
                    <p className='underline' onClick={openNav}>
                        View Instructions 

                    </p>
                </div>
            </div>
            <form onSubmit={formik.handleSubmit} autoComplete='off' >
                <div className='flex flex-wrap'>
                    <div className='space-y-1 m-3'>
                        <p>Age</p>
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} name='age' value={formik.values.age} className='border-[2px] border-purple-600 rounded-md px-2 py-1 w-[260px]' type="text" placeholder='Age of the patient' />
                        <p className='text-xs text-red-600'> {formik.touched.age && formik.errors.age ? "Age of the patient (in years)":null}</p>
                    </div>
                    <div className='space-y-1 m-3'>
                        <p>Gender</p>
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} name='sex' value={formik.values.sex} className='border-[2px] border-purple-600 rounded-md px-2 py-1 w-[260px]' type="text" placeholder='Gender of the patient' />
                        <p className='text-xs text-red-600'> {formik.touched.sex && formik.errors.sex ? "Gender of the patient (0 = female, 1 = male)":null}</p>
                    </div>
                    <div className='space-y-1 m-3'>
                        <p>Chest Pain Type</p>
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} name='cp' value={formik.values.cp} className='border-[2px] border-purple-600 rounded-md px-2 py-1 w-[260px]' type="text" placeholder='Chest Pain Type' />
                        <p className='text-xs text-red-600'> {formik.touched.cp && formik.errors.cp ? "Chest Pain (view instructions for more)":null}</p>
                    </div>
                    <div className='space-y-1 m-3'>
                        <p>Resting Blood Pressure</p>
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} name='trestbps' value={formik.values.trestbps} className='border-[2px] border-purple-600 rounded-md px-2 py-1 w-[260px]' type="text" placeholder='in mm Hg' />
                        <p className='text-xs text-red-600'> {formik.touched.trestbps && formik.errors.trestbps ? "Resting blood pressure (in mm Hg)":null}</p>

                    </div>
                    <div className='space-y-1 m-3'>
                        <p>Serum cholesterol level</p>
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} name='chol' value={formik.values.chol} className='border-[2px] border-purple-600 rounded-md px-2 py-1 w-[260px]' type="text" placeholder='in mm/dl' />
                        <p className='text-xs text-red-600'> {formik.touched.chol && formik.errors.chol ? "Serum cholesterol level (in mg/dl)":null}</p>
                    </div>
                    <div className='space-y-1 m-3'>
                        <p>Fasting blood sugar</p>
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} name='fbs' value={formik.values.fbs} className='border-[2px] border-purple-600 rounded-md px-2 py-1 w-[260px]' type="text" placeholder='&gt; 120 mg/dl or not' />
                        <p className='text-xs text-red-600'> {formik.touched.fbs && formik.errors.fbs ? "Fasting blood sugar > 120 mg/dl (1 = true, 0 = false)":null}</p>
                    </div>
                    <div className='space-y-1 m-3'>
                        <p className='text-wrap'>Resting electrocardiographic results</p>
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} name='restecg' value={formik.values.restecg} className='border-[2px] border-purple-600 rounded-md px-2 py-1 w-[260px]' type="text" placeholder='Resting electrocardiographic results' />
                        <p className='text-xs text-red-600'> {formik.touched.restecg && formik.errors.restecg ? "Resting electrocardiographic results":null}</p>
                    </div>
                    <div className='space-y-1 m-3'>
                        <p>Maximum heart rate achieved</p>
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} name='thalach' value={formik.values.thalach} className='border-[2px] border-purple-600 rounded-md px-2 py-1 w-[260px]' type="text" placeholder='(in beats per minute)' />
                        <p className='text-xs text-red-600'> {formik.touched.thalach && formik.errors.thalach ? "Maximum heart rate achieved (in beats per minute)":null}</p>
                    </div>
                    <div className='space-y-1 m-3'>
                        <p>Exercise induced angina</p>
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} name='exang' value={formik.values.exang} className='border-[2px] border-purple-600 rounded-md px-2 py-1 w-[260px]' type="text" placeholder='Exercise induced angina' />
                        <p className='text-xs text-red-600'> {formik.touched.exang && formik.errors.exang ? "Exercise induced angina (1 = yes, 0 = no)":null}</p>
                    </div>
                    <div className='space-y-1 m-3'>
                        <p>ST depression induced by exercise</p>
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} name='oldpeak' value={formik.values.oldpeak} className='border-[2px] border-purple-600 rounded-md px-2 py-1 w-[260px]' type="text" placeholder='ST depression induced by exercise relative to rest' />
                        <p className='text-xs text-red-600'> {formik.touched.oldpeak && formik.errors.oldpeak ? "ST depression induced by exercise relative to rest":null}</p>
                    </div>
                    <div className='space-y-1 m-3'>
                        <p>Slope of peak exercise ST segment</p>
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} name='slope' value={formik.values.slope} className='border-[2px] border-purple-600 rounded-md px-2 py-1 w-[260px]' type="text" placeholder='The slope of the peak exercise ST segment' />
                        <p className='text-xs text-red-600'> {formik.touched.slope && formik.errors.slope ? "The slope of the peak exercise ST segment ":null}</p>
                    </div>
                    <div className='space-y-1 m-3'>
                        <p>Number of major vessels</p>
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} name='ca' value={formik.values.ca} className='border-[2px] border-purple-600 rounded-md px-2 py-1 w-[260px]' type="text" placeholder='Colored by fluoroscopy' />
                        <p className='text-xs text-red-600'> {formik.touched.ca && formik.errors.ca ? "Number of major vessels (0-3) colored by fluoroscopy":null}</p>
                    </div>
                    <div className='space-y-1 m-3'>
                        <p>Thalassemia type</p>
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} name='thal' value={formik.values.thal} className='border-[2px] border-purple-600 rounded-md px-2 py-1 w-[260px]' type="text" placeholder='Thalassemia type' />
                        <p className='text-xs text-red-600'> {formik.touched.thal && formik.errors.thal ? "Thalassemia type":null}</p>
                    </div>
                </div>
                
                <button type='submit' id='btn' disabled={isFormValid === false} style={{color:`${isFormValid ? "white" :"gray"}`,background:`linear-gradient(90deg, rgba(207,5,189,${isFormValid ? "1" :"0.23"}) 0%, rgba(142,25,214,${isFormValid ? "1" :"0.23"}) 51%, rgba(216,0,219,${isFormValid ? "1" :"0.23"}) 100%)`}} className={`bg-[rgb(149,24,24,${isFormValid?"1":"0.23"})] md:w-[200px] flex justify-center items-center rounded-lg p-3 text-${isFormValid?"white":"[#c1c1c1]"}` }>
                    Predict Disease
                </button>
            </form>
            <div>
                <div id='loading' className='hidden bg-gray-200 my-2 w-[68vw] h-[80px] rounded-lg px-5 py-4 space-y-3'>
                    <div className='w-[60vw] animate-pulse h-2 rounded-md bg-gray-500'></div>
                    <div className='w-[50vw] animate-pulse h-2 rounded-md bg-gray-500'></div>
                    <div className='w-[60vw] animate-pulse h-2 rounded-md bg-gray-500'></div>
                </div>
                <div id='no' className='bg-green-200 p-3 my-2 rounded-lg hidden'>
                    
                    <p className='text-green-900'>
                    According to the prediction, it appears that the patient does not have heart disease. 😀
                    <br />However, it's essential to maintain a healthy lifestyle and undergo regular check-ups to ensure overall well-being. 😊🤗
                    </p>
                </div>

                <div id='yes' className='bg-yellow-200 p-3 my-2 rounded-lg hidden'>
                    <p className='text-yellow-900'>
                        Based on the prediction, it seems likely that the patient has heart disease. 😥
                        <br />We recommend consulting a healthcare professional for further evaluation and treatment. 😷💊
                    </p>
                </div>

            </div>
        </div>
    )
}

export default Heart