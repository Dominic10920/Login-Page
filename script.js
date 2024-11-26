document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form reload

    const name = document.getElementById('name').value.trim();
    const grade = document.getElementById('grade').value;
    const strand = document.getElementById('strand').value;
    const section = document.getElementById('section').value.trim();

    if (name && grade && strand && section) {
        // Google Apps Script Web App URL
        const scriptURL = "https://script.google.com/macros/s/AKfycbwXOKbrxHK_sEFGb40z10PDt8duUz0X0bdTbo_0oqyCWGZqX7o_1UsY29Ad2pX4diba/exec"; // Replace with your actual URL

        // Data to send
        const formData = new URLSearchParams({
            name: name,
            grade: grade,
            strand: strand,
            section: section
        });

        // Send data to Google Spreadsheet
        fetch(scriptURL, {
            method: "POST",
            body: formData
        })
            .then(response => response.text())
            .then(result => {
                if (result === "Success") {
                    // Hide login page and show success page with user info
                    document.getElementById('loginPage').style.display = 'none';
                    document.getElementById('successPage').style.display = 'block';

                    document.getElementById('userInfo').innerHTML = `
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Grade:</strong> ${grade}</p>
                        <p><strong>Strand:</strong> ${strand}</p>
                        <p><strong>Section:</strong> ${section}</p>
                    `;
                } else {
                    document.getElementById('output').innerHTML = `<p style='color: red;'>Submission failed: ${result}</p>`;
                }
            })
            .catch(error => {
                document.getElementById('output').innerHTML = `<p style='color: red;'>Error: ${error.message}</p>`;
            });
    } else {
        document.getElementById('output').innerHTML = '<p style="color: red;">Please fill out all fields.</p>';
    }
});

// Sign out functionality
document.getElementById('signOutButton').addEventListener('click', function () {
    // Hide success page and show login page again
    document.getElementById('successPage').style.display = 'none';
    document.getElementById('loginPage').style.display = 'block';

    // Clear user data
    document.getElementById('name').value = '';
    document.getElementById('grade').value = '';
    document.getElementById('strand').value = '';
    document.getElementById('section').value = '';
    document.getElementById('output').innerHTML = ''; // Clear error/success message
});