document.write(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AR Scanner UI</title>
    <script src="https://aframe.io/releases/1.5.0/aframe.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js"></script>
    <style>
        .play-button {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1000;
            padding: 10px 20px;
            font-size: 16px;
            background-color: rgba(255, 255, 255, 0.5);
            border: none;
            cursor: pointer;
            border-radius: 50%;
            width: 80px;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .play-button img {
            width: 80px;
            height: 80px;
        }
    </style>
</head>
<body>
    <button id="play-button" class="play-button">
        <img src="https://robokart.com/WebAR/play_icon.png" alt="Play Icon">
    </button>
    <a-scene mindar-image="imageTargetSrc:https://cdn.jsdelivr.net/gh/Robokart123/MindAR@latest/targets.mind; uiScanning:no; filterMinCF:0.0001; filterBeta: 0.008" "missTolerance: 0.5" "warmupTolerance: 0.5" color-space="sRGB" renderer="colorManagement: true, physicallyCorrectLights" xr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: true">
        <a-assets>
            <video id="video" src="https://cdn.jsdelivr.net/gh/Robokart123/MindAR@latest/Video.mp4" crossorigin="anonymous" loop="true" playsinline></video>
        </a-assets>

        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
        <a-entity mindar-image-target="targetIndex: 0">
            <a-plane id="video-entity" src="#video" position="0 0 0.1" width="1.05" height="1.84" rotation="0 0 0"></a-plane>
        </a-entity>
    </a-scene>

    <script>
        document.addEventListener("DOMContentLoaded", function() {
            const video = document.getElementById("video");
            const playButton = document.getElementById("play-button");

            playButton.addEventListener("click", function() {
                video.currentTime = 0; // Reset video position to beginning
                video.play();
                playButton.style.display = "none";
            });

            const videoEntity = document.getElementById("video-entity");

            videoEntity.addEventListener('loadeddata', function() {
                // Place the play button over the video
                const scene = document.querySelector('a-scene');
                const videoPosition = videoEntity.getAttribute('position');
                const videoWidth = videoEntity.getAttribute('width');
                const videoHeight = videoEntity.getAttribute('height');

                // Adjust play button position based on video dimensions and position
                playButton.style.top = \`\${window.innerHeight / 2}px\`;
                playButton.style.left = \`\${window.innerWidth / 2}px\`;
            });
        });
    </script>
</body>
</html>
`);
