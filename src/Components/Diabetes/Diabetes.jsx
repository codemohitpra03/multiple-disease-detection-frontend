import { useFormik } from 'formik'
import React, { useState } from 'react'
import instructions from '../../assets/instructions.png'
import * as Yup from "yup"

const Diabetes = () => {
     // Change variable name to reflect diabetes prediction
    const formik = useFormik({
		initialValues: {
            pregnancies: "",
            glucose: "",
            bloodPressure: "",
            skinThickness: "",
            insulin: "",
            BMI: "",
            diabetesPedigreeFunction: "",
            age: ""
        },
		validationSchema: Yup.object({
			pregnancies: Yup.string().required("str.string of times pregnant"),
            glucose: Yup.string().required("Plasma glucose concentration after 2 hours in an oral glucose tolerance test"),
            bloodPressure: Yup.string().required("Diastolic blood pressure (mm Hg)"),
            skinThickness: Yup.string().required("Triceps skin fold thickness (mm)"),
            insulin: Yup.string().required("2-Hour serum insulin (mu U/ml)"),
            BMI: Yup.string().required("Body mass index (weight in kg/(height in m)^2)"),
            diabetesPedigreeFunction: Yup.string().required("Diabetes pedigree function"),
            age: Yup.string().required("Age of the patient (years)")
		}),
        onSubmit: async(values) => {
            let data = values;
            function convertToNumber(value) {
                const parsedValue = parseFloat(value);
                return isNaN(parsedValue) ? null : parsedValue;
            }
            
            // Convert values to numbers
            for (let key in data) {
                data[key] = convertToNumber(data[key]);
            }
            console.log(data);
            const response = await fetch("http://localhost:80/api/diabetes/",
            {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    // "input_arrays":[1,103,30,38,83,43.3,0.183,33]
                    "input_arrays":Object.values(data).map(convertToNumber)
                })
            })

            const json = await response.json();
            console.log(json);
            

            if(json.result){
                document.getElementById("yes").style.display = "block"
                document.getElementById("no").style.display = "none"
            }else{
                document.getElementById("yes").style.display = "none"
                document.getElementById("no").style.display = "block"

            }
        }
	})
	console.log(formik.values);
	const isFormValid = formik.isValid && Object.keys(formik.touched).length > 0

    function openNav() {
        document.getElementById("myNav").style.width = "100%";
    }
      
    function closeNav() {
        document.getElementById("myNav").style.width = "0%";
    }

    return (
        <div className='h-[100vh] bg-gray-50 p-16 overflow-auto'>
            <div id="myNav" className="overlay h-full w-0 fixed z-10 left-0 top-0 overflow-x-hidden duration-500 bg-[rgb(0,0,0,0.99)]">
                <a href={void(0)} className="cursor-pointer closebtn absolute top-5 right-11 text-7xl text-white" onClick={closeNav} >&times;</a>
                <div className="overlay-content relative top-[25%] w-full flex justify-center items-center mt-7 text-white">
                    <ul className='space-y-5 my-5 pl-20'>
                        <p className='font-bold text-4xl'>Description of each field</p>
                        <li><strong>Pregnancies:</strong> Number of times pregnant</li>
                        <li><strong>Glucose:</strong> Plasma glucose concentration after 2 hours in an oral glucose tolerance test</li>
                        <li><strong>Blood Pressure:</strong> Diastolic blood pressure (mm Hg)</li>
                        <li><strong>Skin Thickness:</strong> Triceps skin fold thickness (mm)</li>
                        <li><strong>Insulin:</strong> 2-Hour serum insulin (mu U/ml)</li>
                        <li><strong>BMI:</strong> Body mass index (weight in kg/(height in m)^2)</li>
                        <li><strong>Diabetes Pedigree Function:</strong> Diabetes pedigree function (a function that scores likelihood of diabetes based on family history)</li>
                        <li><strong>Age:</strong> Age of the patient (years)</li>
                    </ul>
                </div>
            </div>
            <div className='flex items-center justify-between'>
                <p className='font-bold text-2xl'>Enter Details</p>
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
                        <p>Pregnancies</p>
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} name='pregnancies' value={formik.values.pregnancies} className='border-[2px] border-purple-600 rounded-md px-2 py-1 w-[260px]' type="text" placeholder='Number of times pregnant' />
                        <p className='text-xs text-red-600'> {formik.touched.pregnancies && formik.errors.pregnancies ? "Number of times pregnant":null}</p>
                    </div>
                    <div className='space-y-1 m-3'>
                        <p>Glucose</p>
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} name='glucose' value={formik.values.glucose} className='border-[2px] border-purple-600 rounded-md px-2 py-1 w-[260px]' type="text" placeholder='Plasma glucose concentration' />
                        <p className='text-xs text-red-600'> {formik.touched.glucose && formik.errors.glucose ? "Plasma glucose concentration":null}</p>
                    </div>
                    
                    
                    <div className='space-y-1 m-3'>
                        <p>Blood Pressure</p>
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} name='bloodPressure' value={formik.values.bloodPressure} className='border-[2px] border-purple-600 rounded-md px-2 py-1 w-[260px]' type="text" placeholder='Diastolic blood pressure' />
                        <p className='text-xs text-red-600'> {formik.touched.bloodPressure && formik.errors.bloodPressure ? "Diastolic blood pressure":null}</p>
                    </div>
                    <div className='space-y-1 m-3'>
                        <p>Skin Thickness</p>
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} name='skinThickness' value={formik.values.skinThickness} className='border-[2px] border-purple-600 rounded-md px-2 py-1 w-[260px]' type="text" placeholder='Triceps skin fold thickness' />
                        <p className='text-xs text-red-600'> {formik.touched.skinThickness && formik.errors.skinThickness ? "Triceps skin fold thickness":null}</p>
                    </div>
                    <div className='space-y-1 m-3'>
                        <p>Insulin</p>
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} name='insulin' value={formik.values.insulin} className='border-[2px] border-purple-600 rounded-md px-2 py-1 w-[260px]' type="text" placeholder='2-Hour serum insulin' />
                        <p className='text-xs text-red-600'> {formik.touched.insulin && formik.errors.insulin ? "2-Hour serum insulin":null}</p>
                    </div>
                    <div className='space-y-1 m-3'>
                        <p>BMI</p>
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} name='BMI' value={formik.values.BMI} className='border-[2px] border-purple-600 rounded-md px-2 py-1 w-[260px]' type="text" placeholder='Body mass index' />
                        <p className='text-xs text-red-600'> {formik.touched.BMI && formik.errors.BMI ? "Body mass index":null}</p>
                    </div>
                    <div className='space-y-1 m-3'>
                        <p>Diabetes Pedigree Function</p>
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} name='diabetesPedigreeFunction' value={formik.values.diabetesPedigreeFunction} className='border-[2px] border-purple-600 rounded-md px-2 py-1 w-[260px]' type="text" placeholder='Diabetes pedigree function' />
                        <p className='text-xs text-red-600'> {formik.touched.diabetesPedigreeFunction && formik.errors.diabetesPedigreeFunction ? "Diabetes pedigree function":null}</p>
                    </div>
                    <div className='space-y-1 m-3'>
                        <p>Age</p>
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} name='age' value={formik.values.age} className='border-[2px] border-purple-600 rounded-md px-2 py-1 w-[260px]' type="text" placeholder='Age of the patient' />
                        <p className='text-xs text-red-600'> {formik.touched.age && formik.errors.age ? "Age of the patient (years)":null}</p>
                    </div>
                </div>
                
                <button type='submit' id='btn' disabled={isFormValid === false} style={{color:`${isFormValid ? "white" :"gray"}`,background:`linear-gradient(90deg, rgba(207,5,189,${isFormValid ? "1" :"0.23"}) 0%, rgba(142,25,214,${isFormValid ? "1" :"0.23"}) 51%, rgba(216,0,219,${isFormValid ? "1" :"0.23"}) 100%)`}} className={`bg-[rgb(149,24,24,${isFormValid?"1":"0.23"})] md:w-[200px] flex justify-center items-center rounded-lg p-3 text-${isFormValid?"white":"[#c1c1c1]"}` }>
					Predict Disease
                </button>
            </form>
            <div>
                <div id='no' className='bg-green-200 p-3 my-2 rounded-lg hidden'>
                    <p className='text-green-900'>
                        According to the prediction, it appears that the patient does not have diabetes. 😀 However, it's essential to maintain a healthy lifestyle and undergo regular check-ups to ensure overall well-being. 😊🤗
                    </p>
                </div>
                <div id='yes' className='bg-yellow-200 p-3 my-2 rounded-lg hidden'>
                <p className='text-yellow-900'>
                        Based on the prediction, it seems likely that the patient has diabetes. 😥 We recommend consulting a healthcare professional for further evaluation and treatment. 😷💊
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Diabetes


