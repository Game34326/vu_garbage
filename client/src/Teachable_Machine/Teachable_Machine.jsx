import React, { useRef } from "react";
import * as tmImage from "@teachablemachine/image";
import "./teachable.css";

const TeachableMachine = () => {
  const webcamContainerRef = useRef(null);
  const labelContainerRef = useRef(null);
  let model, webcam, maxPredictions;

  const startModel = async () => {
    const URL = "https://teachablemachine.withgoogle.com/models/YLhzhPpbA/";
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // Load the image model and setup the webcam
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append elements to the DOM
    webcamContainerRef.current.appendChild(webcam.canvas);
    labelContainerRef.current.innerHTML = ""; // Clear any previous labels
    for (let i = 0; i < maxPredictions; i++) {
      // and class labels
      const predictionContainer = document.createElement("div");
      predictionContainer.style.marginBottom = "10px";


      const progressBar = document.createElement("progress");
      progressBar.style.width = "200px";
      progressBar.style.height = "20px";
      progressBar.value = 0;
      progressBar.max = 1;
      // Inside startModel function


      const textLabel = document.createElement("span");
      textLabel.style.marginLeft = "10px";

      predictionContainer.appendChild(progressBar);
      predictionContainer.appendChild(textLabel);
      labelContainerRef.current.appendChild(predictionContainer);
      console.log(labelContainerRef);
    }
  };

  const loop = () => {
    if (webcam) {
      webcam.update(); // update the webcam frame
      predict();
      window.requestAnimationFrame(loop);
    }
  };

  const predict = async () => {
    if (model && webcam) {
        // run the webcam image through the image model
        const prediction = await model.predict(webcam.canvas);
        for (let i = 0; i < maxPredictions; i++) {
            const progressBar = labelContainerRef.current.childNodes[i].querySelector('progress');
            const textLabel = labelContainerRef.current.childNodes[i].querySelector('span');
            const probability = prediction[i].probability.toFixed(2);

            // Log class name and probability to console
            console.log(`${prediction[i].className}: ${probability}`);

            // Set progress bar value and text
            progressBar.value = probability;
            textLabel.textContent = `${prediction[i].className}: ${probability}`;

            // Set color based on class name
            switch (prediction[i].className.trim()) {
                case 'GreenGarbage':
                    progressBar.style.background = `green !important`;
                    break;
                case 'RedGarbage':
                    progressBar.style.background = `red !important`;
                    break;
                case 'YellowGarbage':
                    progressBar.style.background = `yellow !important`;
                    break;
                case 'BlueGarbage':
                    progressBar.style.background = `blue !important`;
                    break;
                default:
                    progressBar.style.background = `gray !important`;
                    break;
            }
        }
    }
};


  const handleStartButtonClick = () => {
    startModel();
  };


  return (
    <div style={{ textAlign: "center" }}>
      <h1>Teachable Machine Image Model</h1>
      <button type="button" onClick={handleStartButtonClick}>
        Start
      </button>
      <div
        ref={webcamContainerRef}
        style={{
          margin: "20px auto",
          width: "200px",
          height: "200px",
          overflow: "hidden",
          borderRadius: "8px",
        }}
      ></div>
      <div ref={labelContainerRef} style={{ marginTop: "20px" }}></div>
    </div>
  );
};

export default TeachableMachine;
