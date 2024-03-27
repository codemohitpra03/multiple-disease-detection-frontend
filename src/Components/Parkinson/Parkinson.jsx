import { useFormik } from 'formik'
import React, { useState } from 'react'
import instructions from '../../assets/instructions.png'
import * as Yup from "yup"

const Parkinson = () => {
    
    
    const formik = useFormik({
		initialValues: {
            MDVP_Fo_Hz: "",
            MDVP_Fhi_Hz: "",
            MDVP_Flo_Hz: "",
            MDVP_Jitter_percent: "",
            MDVP_Jitter_Abs: "",
            MDVP_RAP: "",
            MDVP_PPQ: "",
            Jitter_DDP: "",
            MDVP_Shimmer: "",
            MDVP_Shimmer_dB: "",
            Shimmer_APQ3: "",
            Shimmer_APQ5: "",
            MDVP_APQ: "",
            Shimmer_DDA: "",
            NHR: "",
            HNR: "",
            RPDE: "",
            DFA: "",
            spread1: "",
            spread2: "",
            D2: "",
            PPE: ""
        },
		validationSchema: Yup.object({
            MDVP_Fo_Hz: Yup.string().required("Mean frequency of vocal fundamental frequency in Hz"),
            MDVP_Fhi_Hz: Yup.string().required("Maximum vocal fundamental frequency in Hz"),
            MDVP_Flo_Hz: Yup.string().required("Minimum vocal fundamental frequency in Hz"),
            MDVP_Jitter_percent: Yup.string().required("Variation in vocal fundamental frequency (%)"),
            MDVP_Jitter_Abs: Yup.string().required("Absolute jitter (ms)"),
            MDVP_RAP: Yup.string().required("Relative amplitude perturbation"),
            MDVP_PPQ: Yup.string().required("Five-point period perturbation quotient"),
            Jitter_DDP: Yup.string().required("Average difference between consecutive periods (ms)"),
            MDVP_Shimmer: Yup.string().required("Variation in amplitude of vocal folds"),
            MDVP_Shimmer_dB: Yup.string().required("Shimmer in dB"),
            Shimmer_APQ3: Yup.string().required("Amplitude perturbation quotient for the first three instants"),
            Shimmer_APQ5: Yup.string().required("Amplitude perturbation quotient for the first five instants"),
            MDVP_APQ: Yup.string().required("Five-point period perturbation quotient for measures of amplitude variation"),
            Shimmer_DDA: Yup.string().required("Average absolute differences between amplitudes of consecutive periods"),
            NHR: Yup.string().required("Noise-to-harmonics ratio"),
            HNR: Yup.string().required("Harmonics-to-noise ratio"),
            RPDE: Yup.string().required("Recurrence period density entropy"),
            DFA: Yup.string().required("Detrended fluctuation analysis"),
            spread1: Yup.string().required("Spread of principal component 1"),
            spread2: Yup.string().required("Spread of principal component 2"),
            D2: Yup.string().required("Correlation dimension"),
            PPE: Yup.string().required("Pitch period entropy")
		}),
        onSubmit: async(values) => {
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
            const response = await fetch("http://multiple-disease-detection-env.eba-mdcr382y.ap-south-1.elasticbeanstalk.com/api/parkinsons/",
            {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    // "input_arrays":[199.22800,209.51200,192.09100,0.00241,0.00001,0.00134,0.00138,0.00402,0.01015,0.08900,0.00504,0.00641,0.00762,0.01513,0.00167,30.94000,0.432439,0.742055,-7.682587,0.173319,2.103106,0.068501]
                    "input_arrays":Object.values(data).map(convertToNumber)
                })
            })

            const json = await response.json();
            console.log(json);
            
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
      
    function closeNav() {
        document.getElementById("myNav").style.width = "0%";
    }

      const inputFields = Object.keys(formik.values).map((fieldName) => (
        <div key={fieldName} className='space-y-1 m-3'>
			
            <p>{fieldName}</p>
            <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name={fieldName}
                value={formik.values[fieldName]}
                className='border-[2px] border-purple-600 rounded-md px-2 py-1 w-[65vw]'
                type='text'
                placeholder={`Enter ${fieldName}`}
            />
            <p className='text-xs text-red-600'>
                {formik.touched[fieldName] && formik.errors[fieldName] ? formik.errors[fieldName] : null}
            </p>
        </div>
    ));

    return (
        <div className='h-[100vh] bg-gray-50 p-16 overflow-auto'>
            <div id="myNav" className="overlay h-full w-0 fixed z-10 left-0 top-0 overflow-x-hidden duration-500 bg-[rgb(0,0,0,0.99)]">
                <a href={void(0)} className="cursor-pointer closebtn absolute top-5 right-11 text-7xl text-white" onClick={closeNav} >&times;</a>
                <div className="overlay-content relative top-[25%] w-full flex justify-center items-center mt-7 text-white">
                    <ul className='space-y-5 my-5 pl-20'>
                        <p className='font-bold text-4xl'>Description of each field</p>
                        <li><strong>MDVP_Fo_Hz:</strong> Mean frequency of vocal fundamental frequency in Hertz (Hz)</li>
                        <li><strong>MDVP_Fhi_Hz:</strong> Maximum vocal fundamental frequency in Hertz (Hz)</li>
                        <li><strong>MDVP_Flo_Hz:</strong> Minimum vocal fundamental frequency in Hertz (Hz)</li>
                        <li><strong>MDVP_Jitter_percent:</strong> Variation in vocal fundamental frequency, measured as a percentage</li>
                        <li><strong>MDVP_Jitter_Abs:</strong> Absolute jitter (in ms)</li>
                        <li><strong>MDVP_RAP:</strong> Relative amplitude perturbation, a measure of variation in speech</li>
                        <li><strong>MDVP_PPQ:</strong> Five-point period perturbation quotient, a measure of variation in speech</li>
                        <li><strong>Jitter_DDP:</strong> Average difference between consecutive periods in milliseconds</li>
                        <li><strong>MDVP_Shimmer:</strong> Variation in amplitude of vocal folds, measured in dB</li>
                        <li><strong>MDVP_Shimmer_dB:</strong> Shimmer in decibels (dB)</li>
                        <li><strong>Shimmer_APQ3:</strong> Amplitude perturbation quotient, measured for the first three instants of the waveform</li>
                        <li><strong>Shimmer_APQ5:</strong> Amplitude perturbation quotient, measured for the first five instants of the waveform</li>
                        <li><strong>MDVP_APQ:</strong> Five-point period perturbation quotient for measures of amplitude variation</li>
                        <li><strong>Shimmer_DDA:</strong> Average absolute differences between amplitudes of consecutive periods</li>
                        <li><strong>NHR:</strong> Noise-to-harmonics ratio, a measure of the ratio of noise to tonal components in the voice</li>
                        <li><strong>HNR:</strong> Harmonics-to-noise ratio, a measure of the ratio of tonal components to noise in the voice</li>
                        <li><strong>RPDE:</strong> Recurrence period density entropy, a measure of the complexity of the recurrence plot</li>
                        <li><strong>DFA:</strong> Detrended fluctuation analysis, a measure of long-term correlations in time series data</li>
                        <li><strong>spread1:</strong> Spread of principal component 1</li>
                        <li><strong>spread2:</strong> Spread of principal component 2</li>
                        <li><strong>D2:</strong> Correlation dimension, a measure of the complexity of the signal</li>
                        <li><strong>PPE:</strong> Pitch period entropy, a measure of the variability in pitch period lengths</li>
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
            
            <form onSubmit={formik.handleSubmit} autoComplete='off'>
                <div className='flex flex-wrap'>
                
                  {inputFields}
                
                </div>
                <button type='submit' id='btn' disabled={!isFormValid} style={{ color: `${isFormValid ? "white" : "gray"}`, background: `linear-gradient(90deg, rgba(207,5,189,${isFormValid ? "1" : "0.23"}) 0%, rgba(142,25,214,${isFormValid ? "1" : "0.23"}) 51%, rgba(216,0,219,${isFormValid ? "1" : "0.23"}) 100%)` }} className={`bg-[rgb(149,24,24,${isFormValid ? "1" : "0.23"})] md:w-[200px] flex justify-center items-center rounded-lg p-3 text-${isFormValid ? "white" : "[#c1c1c1]"} `}>
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
                        According to the prediction, it appears that the patient does not have Parkinson's disease. 😊 However, it's essential to consult a healthcare professional for further evaluation.
                    </p>
                </div>
                <div id='yes' className='bg-yellow-200 p-3 my-2 rounded-lg hidden'>
                    <p className='text-yellow-900'>
                        Based on the prediction, it seems likely that the patient has Parkinson's disease. 😞 We recommend consulting a healthcare professional for further evaluation.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Parkinson
















































