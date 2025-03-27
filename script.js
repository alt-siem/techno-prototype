document.addEventListener("DOMContentLoaded", function () {
    let scopeContainer = document.getElementById("scopeContainer");
    let addScopeBtn = document.getElementById("addScope");
    let generateContractBtn = document.getElementById("generateContract");
    let downloadPDFBtn = document.getElementById("downloadPDF");

    // Add a new input field for scope of work
    addScopeBtn.addEventListener("click", function () {
        let newInput = document.createElement("div");
        newInput.innerHTML = `
            <input type="text" class="scopeItem" placeholder="Enter a scope item" required>
            <button type="button" class="removeScope">❌</button>
        `;
        scopeContainer.appendChild(newInput);

        // Add event listener to remove button
        newInput.querySelector(".removeScope").addEventListener("click", function () {
            newInput.remove();
        });
    });

    document.getElementById("contractForm").addEventListener("submit", function (event) {
        event.preventDefault();
    
        // Get all scope of work items (trim spaces and remove empty entries)
        let scopeItems = Array.from(document.querySelectorAll(".scopeItem"))
            .map(input => input.value.trim())
            .filter(text => text.length > 0); 
    
        // Format scope items as a bullet list
        let scopeOfWork = scopeItems.length > 0
            ? `<ul>${scopeItems.map(item => `<li>${item}</li>`).join('')}</ul>`
            : "<p><i>No specific scope provided.</i></p>";
    
        // Get user input values and trim spaces
        let constructorName = document.getElementById("constructorName").value.trim();
        let constructorAddress = document.getElementById("constructorAddress").value.trim();
        let clientName = document.getElementById("clientName").value.trim();
        let clientAddress = document.getElementById("clientAddress").value.trim();
        let propertyAddress = document.getElementById("propertyAddress").value.trim();
        let startDate = document.getElementById("startDate").value.trim();
        let endDate = document.getElementById("endDate").value.trim();
        let totalCost = document.getElementById("totalCost").value.trim();
        let initialPayment = document.getElementById("initialPayment").value.trim();
        let finalPayment = document.getElementById("finalPayment").value.trim();
        let invoiceFrequency = document.getElementById("invoiceFrequency").value.trim();
        let paymentMethod = document.getElementById("paymentMethod").value.trim();
    
        // Contract template with placeholders replaced (formatted properly)
        let contractTemplate = `
            <div id="contractContent">
                <h3 style="text-align: center;">CONSTRUCTION CONTRACT AGREEMENT</h3>
                <p>This Construction Contract Agreement is entered into on <b>${new Date().toLocaleDateString()}</b> by and between <b>${constructorName}</b>, with an address of <b>${constructorAddress}</b> (the “Constructor”), and <b>${clientName}</b>, with an address of <b>${clientAddress}</b> (the “Client”) (collectively referred to as the “Parties”).</p>
        
                <h4>CONSTRUCTION PROPERTY</h4>
                <p>The Property that is to be constructed is located at the following address:</p>
                <p><b>${propertyAddress}</b></p>
        
                <h4>SCOPE OF WORK</h4>
                ${scopeOfWork}
        
                <h4>TERM</h4>
                <p>The construction will begin on <b>${startDate}</b> and is expected to be completed by <b>${endDate}</b>.</p>
        
                <h4>PAYMENT AND FEES</h4>
                <p>The total cost of the services will be <b>${totalCost}</b>, where <b>${initialPayment}</b> will be paid at the signing of this Agreement and <b>${finalPayment}</b> will be paid at the completion.</p>
                <p>Invoices will be issued every <b>${invoiceFrequency}</b>, and payments will be made via <b>${paymentMethod}</b>.</p>
        
                <h4>SIGNATURE AND DATE</h4>
                <p>Constructor: _______________________ (Signature) &nbsp;&nbsp; Date: ____________</p>
                <p>Client: _______________________ (Signature) &nbsp;&nbsp; Date: ____________</p>
            </div>
        `;
    
        // Display the generated contract
        document.getElementById("contractOutput").innerHTML = contractTemplate.trim();

        // Show the Download button only after contract is generated
        downloadPDFBtn.style.display = "block";
    });

    // Download as PDF
    downloadPDFBtn.addEventListener("click", function () {
        let contractElement = document.getElementById("contractContent");
        if (contractElement) {
            html2pdf()
                .from(contractElement)
                .save('Construction_Contract.pdf');
        } else {
            alert("Generate a contract before downloading.");
        }
    });
});
document.getElementById("startBtn").addEventListener("click", function () {
    document.getElementById("homepage").style.display = "none";
    document.getElementById("contractPage").style.display = "block";
});