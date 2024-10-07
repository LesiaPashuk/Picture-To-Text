function printFiles(e) { 
    const files = e.target.files;
    const fileItem = document.getElementById("fileItem");
    const imageInfo = document.getElementById("imageInfo");
    fileItem.innerHTML = ""; 
    imageInfo.innerHTML = ""; 

    for (const file of files) {
        const reader = new FileReader();
        
        reader.onload = function(event) {
            const img = document.createElement("img");
            img.src = event.target.result;
            img.className = "image";
            img.id = "image";
                
            fileItem.appendChild(img);

            img.onload = function() {
                const width = img.width;
                const height = img.height;
                const aspectRatio = width / height;
                const fileSize = file.size;
                const totalPixels = width * height;  
                const format = file.name.slice(file.name.indexOf(".") + 1);

                // Создаем canvas для получения информации о пикселях
                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);

                const imageData = ctx.getImageData(0, 0, width, height);
                const colorDepth = (imageData.data.length / (width * height)); // Глубина цвета

                // Оценка несжатого размера
                const uncompressedSize = (width * height * 24) / 8; // 24 бита на пиксель
                const compressionRatio = (uncompressedSize / fileSize).toFixed(2); // Сжатие

                // Вывод информации об изображении
                const generalInfo = `
                    File size: ${fileSize} bytes (${(fileSize / 1024).toFixed(2)} KB)<br>
                    Width/height: ${width}×${height} pixels<br>
                    Total pixel count: ${totalPixels}<br>
                    Aspect ratio: ${aspectRatio.toFixed(2)}<br>
                    Format: ${file.type.split('/')[1]}<br>
                    File name: ${file.name}<br>
                    Extension: ${format}<br>
                    Color depth: ${colorDepth * 8} bits per pixel<br>
                    Uncompressed size: ${uncompressedSize.toFixed(2)} bytes<br>
                    Compression ratio: ${compressionRatio} : 1
                `;

                // Используем innerHTML для вывода с переносами строк
                imageInfo.innerHTML = generalInfo;

                // Дополнительно можно добавить анализ прозрачности и цветовой палитры
                // analyzeImagePixels(img);
            };
        };
        
        reader.readAsDataURL(file); 
    }
}

document.getElementById("files").addEventListener("change", printFiles);
