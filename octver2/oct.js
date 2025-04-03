document.addEventListener("DOMContentLoaded", () => {
    const dropZone = document.getElementById("dropZone");
    const resetButton = document.getElementById("resetButton");

    // 모든 드래그 가능한 이미지 가져오기
    const draggableImages = document.querySelectorAll('img[draggable="true"]');

    // 각 이미지에 드래그 이벤트 추가
    draggableImages.forEach((image) => {
        image.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("id", event.target.id);
        });
    });

    dropZone.addEventListener("dragover", (event) => {
        event.preventDefault();
    });

    dropZone.addEventListener("drop", (event) => {
        event.preventDefault();

        // 드래그된 이미지 가져오기
        let imgId = event.dataTransfer.getData("id");
        let draggedImg = document.getElementById(imgId);

        // 새로운 이미지 추가
        let newImg = document.createElement("img");
        newImg.src = draggedImg.src;
        newImg.classList.add("dropped-img"); // CSS 적용을 위한 클래스 추가
        newImg.style.position = "absolute";

        // 마우스 위치 기반으로 이미지 배치
        let rect = dropZone.getBoundingClientRect();
        newImg.style.left = event.clientX - rect.left - 30 + "px";
        newImg.style.top = event.clientY - rect.top - 30 + "px";
        //newImg.style.left = event.clientX - rect.left - 15 + "px"; 
        //newImg.style.top = event.clientY - rect.top - 15 + "px"; 

        //dropZone.appendChild(newImg);

        dropZone.insertBefore(newImg, baseImg);
    });

    // 초기화 기능
    resetButton.addEventListener("click", () => {
        let existingImages = dropZone.querySelectorAll(".dropped-img");
        existingImages.forEach(img => img.remove());
    });

});

