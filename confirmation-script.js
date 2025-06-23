document.addEventListener('DOMContentLoaded', function() {
    const requestReferenceNumberElem = document.getElementById('requestReferenceNumber');
    const qrCodeImageElem = document.getElementById('qrCodeImage');
    const viewDownloadReceiptBtn = document.getElementById('viewDownloadReceiptBtn');
    const submitAnotherRequestBtn = document.getElementById('submitAnotherRequestBtn');
    const backToHomeBtn = document.getElementById('backToHomeBtn');

    // Retrieve the reference number and request data from localStorage
    const referenceNumber = localStorage.getItem('lastRequestRef');
    const requestData = JSON.parse(localStorage.getItem('lastRequestData') || '{}');

    // Display the reference number if found
    if (referenceNumber) {
        requestReferenceNumberElem.textContent = referenceNumber;

        // Construct data for QR Code. Use relevant fields from requestData.
        // This makes the QR code more useful than just the reference number.
        let qrCodeContent = `Request Ref: ${referenceNumber}\n`;
        if (requestData.fullName) qrCodeContent += `Name: ${requestData.fullName}\n`;
        if (requestData['request-type']) qrCodeContent += `Type: ${requestData['request-type']}\n`;
        // You can add more fields here if you stored them and want them in the QR code
        // e.g., if (requestData.email) qrCodeContent += `Email: ${requestData.email}\n`;


        // Generate QR Code using Google Charts API
        // This API provides a simple URL-based way to get QR code images.
        // 'cht=qr' for QR code, 'chs=200x200' for size, 'chl=' for content.
        // encodeURIComponent is crucial for handling special characters in the data.
        const qrCodeUrl = `https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${encodeURIComponent(qrCodeContent)}`;
        qrCodeImageElem.src = qrCodeUrl;
        qrCodeImageElem.style.display = 'block'; // Ensure QR image is visible
    } else {
        // Fallback if no reference number is found (e.g., direct navigation to page)
        requestReferenceNumberElem.textContent = 'N/A (No recent submission found)';
        qrCodeImageElem.style.display = 'none'; // Hide QR code if no data to display
    }

    // --- Button Event Listeners ---

    // 1. "View & Download Receipt" button
    viewDownloadReceiptBtn.addEventListener('click', function() {
        // The @media print CSS rules in dashboard-style.css will apply
        // to make this confirmation page print-friendly.
        window.print();
    });

    // 2. "Submit Another Request" button
    submitAnotherRequestBtn.addEventListener('click', function() {
        // Redirects the user back to the request creation form.
        window.location.href = 'request-form.html';
    });

    // 3. "Back to Home" button
    backToHomeBtn.addEventListener('click', function() {
        // Redirects the user to the homepage.
        window.location.href = 'homepage.html';
    });

    
});