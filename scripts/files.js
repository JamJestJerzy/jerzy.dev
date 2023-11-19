function dropHandler(ev) {
    console.log("File(s) dropped");
    ev.preventDefault();

    const password = prompt('Enter password to upload files:');
    if (password === null || password === '') {
        return; // Do nothing if the user cancels or provides an empty password
    }

    const files = [];
    if (ev.dataTransfer.items) {
        [...ev.dataTransfer.items].forEach((item) => {
            if (item.kind === "file") {
                const file = item.getAsFile();
                files.push(file);
            }
        });
    } else {
        files.push(...ev.dataTransfer.files);
    }

    sendFilesToServer(files, password);
}

function dragOverHandler(ev) {
    ev.preventDefault();
}

function sendFilesToServer(files, password) {
    const formData = new FormData();
    files.forEach((file, i) => {
        formData.append(`files`, file);
    });

    formData.append('password', password);

    fetch('https://j3rzy.dev/upload', {
        method: 'POST',
        body: formData,
        headers: {
            'password': password
        }
    })
        .then(response => response.text())
        .then(data => {
            console.log('Server response:', data);
        })
        .catch(error => {
            console.error('Error uploading files:', error);
        });
}