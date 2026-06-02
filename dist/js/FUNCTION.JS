        // --- STREAMING_CHUNK:Running application setup & localization mappings ---
        const TRANSLATIONS = {
            en: {
                welcome: "Welcome to Sto. Niño Portal",
                subwelcome: "Please choose the document you would like to process today.",
                clearanceTitle: "Barangay Clearance",
                clearanceDesc: "Residency, travel, and moral standing clearance.",
                indigencyTitle: "Certificate of Indigency",
                indigencyDesc: "For low-income financial assistance needs.",
                residencyTitle: "Certificate of Residency",
                residencyDesc: "Proof of address and long-term residency.",
                businessTitle: "Barangay Business Permit",
                businessDesc: "License permit to run a business in Sto. Niño.",
                screensaverBtn: "Screensaver",
                labelName: "Full Name",
                labelAddress: "Address",
                labelBirth: "Birthdate",
                labelStatus: "Civil Status",
                labelPurpose: "Purpose",
                labelOwner: "Owner Full Name",
                labelBizName: "Business Name",
                labelBizAddress: "Business Address",
                labelBizNature: "Nature of Business",
                labelBizContact: "Contact Number",
                clearanceMHeader: "Barangay Clearance",
                indigencyMHeader: "Certificate of Indigency",
                residencyMHeader: "Certificate of Residency",
                businessMHeader: "Barangay Business Permit",
                clearanceMFee: "Processing Fee",
                indigencyMFee: "Processing Fee",
                residencyMFee: "Processing Fee",
                businessMFee: "Processing Fee",
                statusSingle: "Single",
                statusMarried: "Married",
                statusWidowed: "Widowed",
                bizRetail: "Retail",
                bizServices: "Services",
                bizFood: "Food & Beverage",
                btnProceed: "Proceed",
                prevBack: "Back to Form",
                prevPrint: "Finalize & Print",
                prevTitle: "Validate Transaction Details",
                prevSub: "Please review the details below before proceeding to generate receipt & barcode.",
                successH: "Transaction Submitted!",
                successSub: "Your application has been logged on the barangay master registry database. Your thermal transaction receipt is currently printing at the bottom slot of the machine.",
                successWarnTitle: "What to do next:",
                successWarnDesc: "Present this printed receipt at the Cashier Window to complete your cash payment and pick up your processed document.",
                successFinish: "Done & Return Home"
            },
            ph: {
                welcome: "Maligayang Pagdating sa Sto. Niño Portal",
                subwelcome: "Piliin ang dokumento na nais mong iproseso ngayon.",
                clearanceTitle: "Barangay Clearance",
                clearanceDesc: "Sertipiko ng paninirahan, paglalakbay, at mabuting asal.",
                indigencyTitle: "Sertipiko ng Indigency",
                indigencyDesc: "Para sa tulong-pinansyal sa mga may mababang kita.",
                residencyTitle: "Sertipiko ng Paninirahan",
                residencyDesc: "Katunayan ng tirahan at matagal na paninirahan.",
                businessTitle: "Permit sa Negosyo ng Barangay",
                businessDesc: "Lisensya para magpatakbo ng negosyo sa Sto. Niño.",
                screensaverBtn: "Screensaver",
                labelName: "Buong Pangalan",
                labelAddress: "Tirahan",
                labelBirth: "Araw ng Kapanganakan",
                labelStatus: "Katayuang Sibil",
                labelPurpose: "Layunin",
                labelOwner: "Buong Pangalan ng May-ari",
                labelBizName: "Pangalan ng Negosyo",
                labelBizAddress: "Address ng Negosyo",
                labelBizNature: "Uri ng Negosyo",
                labelBizContact: "Numero ng Telepono",
                clearanceMHeader: "Barangay Clearance",
                indigencyMHeader: "Sertipiko ng Indigency",
                residencyMHeader: "Sertipiko ng Paninirahan",
                businessMHeader: "Barangay Business Permit",
                clearanceMFee: "Bayad sa Pagproseso",
                indigencyMFee: "Bayad sa Pagproseso",
                residencyMFee: "Bayad sa Pagproseso",
                businessMFee: "Bayad sa Pagproseso",
                statusSingle: "Walang Asawa",
                statusMarried: "May Asawa",
                statusWidowed: "Biyudo/Biyuda",
                bizRetail: "Tindahan / Retail",
                bizServices: "Serbisyo",
                bizFood: "Pagkain at Inumin",
                btnProceed: "Ipagpatuloy",
                prevBack: "Bumalik sa Form",
                prevPrint: "I-finalize at I-print",
                prevTitle: "Suriin ang Detalye ng Transaksyon",
                prevSub: "Pakisuri ang mga detalye sa ibaba bago magpatuloy sa pag-print ng resibo.",
                successH: "Transaksyon ay Naipadala Na!",
                successSub: "Ang iyong aplikasyon ay matagumpay na naitala sa database ng barangay. Ang iyong resibo ay kasalukuyang pini-print sa ilalim ng makina.",
                successWarnTitle: "Susunod na dapat gawin:",
                successWarnDesc: "Ipakita ang printed resibo sa Cashier Window para magbayad ng cash at makuha ang iyong natapos na dokumento.",
                successFinish: "Tapos Na / Bumalik sa Simula"
            }
        };

        // --- GLOBAL APP STATES ---
        let kioskLanguage = "en";
        let activePageId = "page-screensaver";
        let activeModalId = "";
        let transactionDetails = {
            docType: "",
            fee: 0,
            fields: []
        };
        let idleTimer;

        // Initialize default administrator credentials
        if (!localStorage.getItem("admin_username")) {
            localStorage.setItem("admin_username", "admin");
            localStorage.setItem("admin_password", "admin123");
        }

        // --- AUDIO COMPONENT ---
        const synth = new Tone.Synth({
            oscillator: { type: "sine" },
            envelope: { attack: 0.005, decay: 0.1, sustain: 0, release: 0.1 }
        }).toDestination();

        const printerSynth = new Tone.NoiseSynth({
            noise: { type: "pink" },
            envelope: { attack: 0.01, decay: 0.05, sustain: 0.2, release: 0.1 }
        }).toDestination();

        function playSound(type) {
            try {
                if (Tone.context.state !== "running") {
                    Tone.start();
                }
                if (type === "tap") {
                    synth.triggerAttackRelease("C5", "32n");
                } else if (type === "success") {
                    synth.triggerAttackRelease("D5", "16n");
                    setTimeout(() => synth.triggerAttackRelease("F#5", "16n"), 100);
                    setTimeout(() => synth.triggerAttackRelease("A5", "16n"), 200);
                } else if (type === "error") {
                    synth.triggerAttackRelease("F3", "8n");
                } else if (type === "print") {
                    printerSynth.triggerAttackRelease("0.4");
                }
            } catch(e) {
                console.warn("Touch interactions needed to trigger Web Audio Synth.");
            }
        }

        // --- ROUTING ENGINE ---
        function nav(targetPageId) {
            playSound("tap");

            document.getElementById('page-landing').style.display = 'none';
            document.getElementById('page-preview').style.display = 'none';
            document.getElementById('page-success').style.display = 'none';
            document.getElementById('page-screensaver').style.display = 'none';
            document.getElementById('page-admin-login').style.display = 'none';
            document.getElementById('page-admin-dashboard').style.display = 'none';

            const target = document.getElementById(targetPageId);
            if (target) {
                target.style.display = 'flex';
                activePageId = targetPageId;
            }

            resetIdleTimer();
        }

        // --- INACTIVITY WATCHER ---
        function resetIdleTimer() {
            clearTimeout(idleTimer);
            if (activePageId !== "page-screensaver" && activePageId !== "page-admin-dashboard") {
                idleTimer = setTimeout(() => {
                    closeAllFormsAndModals();
                    nav("page-screensaver");
                }, 120000); // 2 minutes automatic fallback
            }
        }

        window.onload = resetIdleTimer;
        document.onmousemove = resetIdleTimer;
        document.onclick = resetIdleTimer;
        document.onkeypress = resetIdleTimer;

        // --- SCREENSAVER LOGIC ---
        function wakeUpKiosk() {
            playSound("success");
            nav("page-landing");
        }

        function switchToScreensaver() {
            nav("page-screensaver");
        }

        // --- TRANSLATOR RUNTIME ENGINE ---
        function toggleLanguage(lang) {
            playSound("tap");
            kioskLanguage = lang;

            const btnEn = document.getElementById("lang-btn-en");
            const btnPh = document.getElementById("lang-btn-ph");
            if (lang === "en") {
                btnEn.className = "px-5 py-2.5 rounded-2xl font-bold transition-all text-sm shadow-sm bg-teal-700 text-white border border-teal-700";
                btnPh.className = "px-5 py-2.5 rounded-2xl font-bold transition-all text-sm shadow-sm bg-white/80 text-slate-700 border border-slate-200 hover:bg-white";
                document.getElementById("lang-indicator").innerHTML = '<i class="fa-solid fa-globe text-teal-600 animate-pulse"></i><span class="font-semibold text-slate-800">English Mode</span>';
            } else {
                btnPh.className = "px-5 py-2.5 rounded-2xl font-bold transition-all text-sm shadow-sm bg-teal-700 text-white border border-teal-700";
                btnEn.className = "px-5 py-2.5 rounded-2xl font-bold transition-all text-sm shadow-sm bg-white/80 text-slate-700 border border-slate-200 hover:bg-white";
                document.getElementById("lang-indicator").innerHTML = '<i class="fa-solid fa-globe text-teal-600 animate-pulse"></i><span class="font-semibold text-slate-800">Tagalog Mode</span>';
            }

            const dict = TRANSLATIONS[lang];
            document.getElementById("lang-welcome").innerText = dict.welcome;
            document.getElementById("lang-subwelcome").innerText = dict.subwelcome;
            document.getElementById("lang-clearance-title").innerText = dict.clearanceTitle;
            document.getElementById("lang-clearance-desc").innerText = dict.clearanceDesc;
            document.getElementById("lang-indigency-title").innerText = dict.indigencyTitle;
            document.getElementById("lang-indigency-desc").innerText = dict.indigencyDesc;
            document.getElementById("lang-residency-title").innerText = dict.residencyTitle;
            document.getElementById("lang-residency-desc").innerText = dict.residencyDesc;
            document.getElementById("lang-business-title").innerText = dict.businessTitle;
            document.getElementById("lang-business-desc").innerText = dict.businessDesc;
            document.getElementById("lang-screensaver-btn").innerText = dict.screensaverBtn;

            document.getElementById("lang-clearance-m-header").innerText = dict.clearanceMHeader;
            document.getElementById("lang-indigency-m-header").innerText = dict.indigencyMHeader;
            document.getElementById("lang-residency-m-header").innerText = dict.residencyMHeader;
            document.getElementById("lang-business-m-header").innerText = dict.businessMHeader;

            document.getElementById("lang-clearance-m-fee").innerText = dict.clearanceMFee;
            document.getElementById("lang-indigency-m-fee").innerText = dict.indigencyMFee;
            document.getElementById("lang-residency-m-fee").innerText = dict.residencyMFee;
            document.getElementById("lang-business-m-fee").innerText = dict.businessMFee;

            document.getElementById("lang-label-name").innerText = dict.labelName;
            document.getElementById("lang-label-address").innerText = dict.labelAddress;
            document.getElementById("lang-label-birth").innerText = dict.labelBirth;
            document.getElementById("lang-label-status").innerText = dict.labelStatus;
            document.getElementById("lang-label-purpose").innerText = dict.labelPurpose;

            document.getElementById("lang-indigency-name").innerText = dict.labelName;
            document.getElementById("lang-indigency-address").innerText = dict.labelAddress;
            document.getElementById("lang-indigency-status").innerText = dict.labelStatus;
            document.getElementById("lang-indigency-purpose").innerText = dict.labelPurpose;

            document.getElementById("lang-residency-name").innerText = dict.labelName;
            document.getElementById("lang-residency-address").innerText = dict.labelAddress;
            document.getElementById("lang-residency-years").innerText = "Years of Residency";
            document.getElementById("lang-residency-purpose").innerText = dict.labelPurpose;

            document.getElementById("lang-business-owner").innerText = dict.labelOwner;
            document.getElementById("lang-business-name").innerText = dict.labelBizName;
            document.getElementById("lang-business-address").innerText = dict.labelBizAddress;
            document.getElementById("lang-business-nature").innerText = dict.labelBizNature;
            document.getElementById("lang-business-contact").innerText = dict.labelBizContact;

            document.getElementById("lang-status-single").innerText = dict.statusSingle;
            document.getElementById("lang-status-married").innerText = dict.statusMarried;
            document.getElementById("lang-status-widowed").innerText = dict.statusWidowed;
            document.getElementById("lang-indigency-single").innerText = dict.statusSingle;
            document.getElementById("lang-indigency-married").innerText = dict.statusMarried;
            document.getElementById("lang-biz-retail").innerText = dict.bizRetail;
            document.getElementById("lang-biz-services").innerText = dict.bizServices;
            document.getElementById("lang-biz-food").innerText = dict.bizFood;

            document.getElementById("lang-clearance-btn-p").innerText = dict.btnProceed;
            document.getElementById("lang-indigency-btn-p").innerText = dict.btnProceed;
            document.getElementById("lang-residency-btn-p").innerText = dict.btnProceed;
            document.getElementById("lang-business-btn-p").innerText = dict.btnProceed;

            document.getElementById("lang-preview-title").innerText = dict.prevTitle;
            document.getElementById("lang-preview-sub").innerText = dict.prevSub;
            document.getElementById("lang-prev-back").innerText = dict.prevBack;
            document.getElementById("lang-prev-print").innerText = dict.prevPrint;

            document.getElementById("lang-success-h").innerText = dict.successH;
            document.getElementById("lang-success-sub").innerText = dict.successSub;
            document.getElementById("lang-success-warn-title").innerText = dict.successWarnTitle;
            document.getElementById("lang-success-warn-desc").innerText = dict.successWarnDesc;
            document.getElementById("lang-success-finish").innerText = dict.successFinish;
        }

        // --- KEYBOARD SETUP ---
        KioskBoard.init({
            keysArrayOfObjects: [
                { "0": "Q", "1": "W", "2": "E", "3": "R", "4": "T", "5": "Y", "6": "U", "7": "I", "8": "O", "9": "P" },
                { "0": "A", "1": "S", "2": "D", "3": "F", "4": "G", "5": "H", "6": "J", "7": "K", "8": "L" },
                { "0": "Z", "1": "X", "2": "C", "3": "V", "4": "B", "5": "N", "6": "M", "7": "Ñ" }
            ],
            keysSpecialCharsArrayOfStrings: ['-', '.', ',', '@', '_', '/'],
            allowRealKeyboard: true,
            autoCaps: true,
            autoScroll: true,
            theme: 'dark'
        });
        KioskBoard.run('.virtual-keyboard');

        // --- DIALOG MODALS ENGINE ---
        function startKioskForm(modalId, docType, fee) {
            playSound("tap");
            
            const modal = document.getElementById(modalId);
            if(modal) {
                const inputs = modal.querySelectorAll("input, select");
                inputs.forEach(input => {
                    input.value = "";
                    if (input.tagName === "SELECT" && input.id === "input-business-scale") {
                        input.value = "200";
                    }
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                });
            }

            // If Business Permit, ensure display resets to standard micro scale
            if (docType === "Barangay Business Permit") {
                document.getElementById("business-permit-fee-display").innerText = "₱200.00";
                fee = 200;
            }

            transactionDetails.docType = docType;
            transactionDetails.fee = fee;
            transactionDetails.fields = [];

            modal.style.display = 'flex';
            modal.classList.remove('hidden');
            activeModalId = modalId;
        }

        function closeFormModal(modalId) {
            playSound("tap");
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('hidden');
                modal.style.display = 'none';
                activeModalId = "";
            }
        }

        function closeAllFormsAndModals() {
            const modals = document.querySelectorAll(".modal-overlay");
            modals.forEach(m => {
                m.classList.add('hidden');
                m.style.display = 'none';
            });
            activeModalId = "";
        }

        // Dynamic fee scale adjustment for Barangay Business Permit
        function updateBusinessPermitFee() {
            const scaleVal = document.getElementById("input-business-scale").value;
            document.getElementById("business-permit-fee-display").innerText = `₱${scaleVal}.00`;
            transactionDetails.fee = parseInt(scaleVal);
        }

        // --- SUBMIT COMPONENT & VALIDATOR ---
        function verifyAndSubmitData(docType, fee, inputClassSelector) {
            const inputs = document.querySelectorAll(inputClassSelector);
            let isComplete = true;
            let capturedFields = [];

            inputs.forEach(input => {
                if (!input.value || input.value.trim() === "") {
                    isComplete = false;
                    input.classList.add("border-red-500");
                } else {
                    input.classList.remove("border-red-500");
                }
                capturedFields.push({
                    key: input.getAttribute("data-key"),
                    value: input.value
                });
            });

            if (!isComplete) {
                playSound("error");
                openMessageBox("Incomplete Form", "Please fill in all input fields to proceed to the review screen.", "error");
                return;
            }

            transactionDetails.fields = capturedFields;
            closeFormModal(activeModalId);

            renderPreviewScreen();
            nav("page-preview");
        }

        function verifyBusinessAndSubmit() {
            // Business permit wrapper with dynamic scale value processing
            const scaleVal = parseInt(document.getElementById("input-business-scale").value);
            verifyAndSubmitData('Barangay Business Permit', scaleVal, '.business-input');
        }

        function renderPreviewScreen() {
            document.getElementById("preview-receipt-type").innerText = transactionDetails.docType;
            document.getElementById("preview-receipt-base").innerText = transactionDetails.fee === 0 ? "FREE" : `₱${transactionDetails.fee}.00`;
            document.getElementById("preview-receipt-total").innerText = transactionDetails.fee === 0 ? "FREE" : `₱${transactionDetails.fee}.00`;

            const container = document.getElementById("preview-form-fields");
            container.innerHTML = "";

            transactionDetails.fields.forEach(field => {
                const element = document.createElement("div");
                element.className = "flex justify-between items-center py-3 border-b border-slate-100";
                element.innerHTML = `
                    <span class="text-slate-500 text-sm font-semibold">${field.key}</span>
                    <span class="text-slate-800 font-extrabold text-base bg-slate-100/80 px-4 py-1.5 rounded-xl border border-slate-200">${field.value}</span>
                `;
                container.appendChild(element);
            });
        }

        function returnToForm() {
            playSound("tap");
            if(transactionDetails.docType === "Barangay Clearance") {
                startKioskForm('page-form-clearance', 'Barangay Clearance', 50);
            } else if(transactionDetails.docType === "Certificate of Indigency") {
                startKioskForm('page-form-indigency', 'Certificate of Indigency', 0);
            } else if(transactionDetails.docType === "Certificate of Residency") {
                startKioskForm('page-form-residency', 'Certificate of Residency', 50);
            } else if(transactionDetails.docType === "Barangay Business Permit") {
                startKioskForm('page-form-business', 'Barangay Business Permit', transactionDetails.fee);
            }
            nav("page-landing");
        }

        // --- SUBMIT TRANSACTION & GENERATE HARDWARE FEEDBACK ---
        function printReceiptAndFinalize() {
            nav("page-success");

            const rand = Math.floor(1000 + Math.random() * 9000);
            const refId = `SN-2026-${rand}`;

            document.getElementById("receipt-ref-id").innerText = refId;
            document.getElementById("receipt-doc-name").innerText = transactionDetails.docType;
            document.getElementById("receipt-doc-fee").innerText = transactionDetails.fee === 0 ? "FREE" : `₱${transactionDetails.fee}.00`;

            const receiptInputs = document.getElementById("receipt-dynamic-inputs");
            receiptInputs.innerHTML = "";
            transactionDetails.fields.forEach(field => {
                const row = document.createElement("div");
                row.className = "flex justify-between text-[11px] font-mono lowercase";
                row.innerHTML = `
                    <span class="text-slate-500">${field.key.substring(0,12)}:</span>
                    <span class="font-bold text-slate-800">${field.value.substring(0,18)}</span>
                `;
                receiptInputs.appendChild(row);
            });

            const now = new Date();
            const formattedDate = `${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}/${now.getFullYear()} ${now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
            document.getElementById("receipt-printed-date").innerText = formattedDate;

            // Generate Dynamic QR Code securely linking to transaction metadata
            const qrContainer = document.getElementById("receipt-qrcode");
            qrContainer.innerHTML = ""; 
            
            setTimeout(() => {
                const serializedData = `ID:${refId}|Doc:${transactionDetails.docType}|Price:${transactionDetails.fee}.00`;
                new QRCode(qrContainer, {
                    text: serializedData,
                    width: 100,
                    height: 100,
                    colorDark : "#0f172a",
                    colorLight : "#fcfcfc",
                    correctLevel : QRCode.CorrectLevel.H
                });
            }, 100);

            // Save transaction records locally using local db storage
            saveToLocalDB(refId, transactionDetails.docType, transactionDetails.fields[0].value, transactionDetails.fee, formattedDate);

            // Execute print simulation progress tracker
            executeSimulatedPrinter();
        }

        function executeSimulatedPrinter() {
            const bar = document.getElementById("printer-progress");
            const percent = document.getElementById("printer-status-percent");
            const text = document.getElementById("printer-status-text");
            let progress = 0;

            function playPrintBeep() {
                if (progress < 100) {
                    playSound("print");
                    setTimeout(playPrintBeep, 180);
                }
            }
            playPrintBeep();

            const interval = setInterval(() => {
                progress += 5;
                if(progress <= 100) {
                    bar.style.width = `${progress}%`;
                    percent.innerText = `${progress}%`;
                    if(progress === 20) text.innerHTML = '<i class="fa-solid fa-sync animate-spin mr-2"></i> Accessing Sto. Niño Server';
                    if(progress === 60) text.innerHTML = '<i class="fa-solid fa-print animate-pulse mr-2"></i> Burning Thermal Carbon Receipt';
                    if(progress === 90) text.innerHTML = '<i class="fa-solid fa-scissors mr-2"></i> Cutting Thermal Slits';
                } else {
                    clearInterval(interval);
                    playSound("success");
                    text.innerHTML = '<i class="fa-solid fa-check-double text-emerald-500 mr-2"></i> Printing Completed Successfully';
                }
            }, 150);
        }

        function resetToHome() {
            playSound("tap");
            closeAllFormsAndModals();
            nav("page-landing");
        }

        // --- STREAMING_CHUNK:Running data storage management routines ---
        // --- DB LOCAL STORAGE CONTROLLER ---
        function saveToLocalDB(refId, docType, name, fee, date) {
            let logs = [];
            if(localStorage.getItem("barangay_kiosk_logs")) {
                logs = JSON.parse(localStorage.getItem("barangay_kiosk_logs"));
            }
            logs.push({ refId, docType, name, fee, date });
            localStorage.setItem("barangay_kiosk_logs", JSON.stringify(logs));
            updateAdminDashboardData();
        }

        function updateAdminDashboardData() {
            let logs = [];
            if(localStorage.getItem("barangay_kiosk_logs")) {
                logs = JSON.parse(localStorage.getItem("barangay_kiosk_logs"));
            }

            const table = document.getElementById("admin-log-table");
            const placeholder = document.getElementById("admin-no-logs");
            table.innerHTML = "";

            // Update specified Figma Label Counter "Document Records (<count>)"
            document.getElementById("figma-document-records-label").innerText = `Document Records (${logs.length})`;

            if(logs.length === 0) {
                placeholder.classList.remove("hidden");
                document.getElementById("admin-stat-revenue").innerText = "₱0.00";
                document.getElementById("admin-stat-count").innerText = "0";
                return;
            } else {
                placeholder.classList.add("hidden");
            }

            let revenue = 0;
            // Iterate in reverse so newest applications display at the top
            for(let i = logs.length - 1; i >= 0; i--) {
                const log = logs[i];
                revenue += parseFloat(log.fee);

                const row = document.createElement("tr");
                row.className = "hover:bg-slate-50 transition-colors";
                
                // Figma Column Structures mapping
                const paymentStatus = log.fee === 0 ? "Waived" : "Unpaid";
                const paymentMethod = log.fee === 0 ? "None" : "Over-The-Counter Cash";

                row.innerHTML = `
                    <td class="px-6 py-4 font-mono font-bold text-teal-700">${log.refId}</td>
                    <td class="px-6 py-4 font-medium text-slate-700">${log.docType}</td>
                    <td class="px-6 py-4 text-xs text-slate-500">${log.date}</td>
                    <td class="px-6 py-4 font-extrabold text-emerald-600">₱${log.fee}.00</td>
                    <td class="px-6 py-4"><span class="px-2 py-1 rounded text-xs font-semibold ${log.fee === 0 ? 'bg-slate-100 text-slate-600' : 'bg-amber-100 text-amber-800'}">${paymentStatus}</span></td>
                    <td class="px-6 py-4 text-xs text-slate-600">${paymentMethod}</td>
                `;
                table.appendChild(row);
            }

            document.getElementById("admin-stat-revenue").innerText = `₱${revenue}.00`;
            document.getElementById("admin-stat-count").innerText = logs.length;
        }

        // Excel/Sheets compatible CSV generation & safe export
        function exportToCSV() {
            playSound("success");
            let logs = [];
            if(localStorage.getItem("barangay_kiosk_logs")) {
                logs = JSON.parse(localStorage.getItem("barangay_kiosk_logs"));
            }

            if(logs.length === 0) {
                openMessageBox("Empty Database", "No transaction records exist inside storage to extract.", "info");
                return;
            }

            // Specify Exact Figma Column Headers
            let csvContent = "Document ID,Type,Date & Time,Amount,Payment Status,Payment Method\r\n";

            logs.forEach(log => {
                const paymentStatus = log.fee === 0 ? "Waived" : "Unpaid";
                const paymentMethod = log.fee === 0 ? "None" : "Over-The-Counter Cash";
                
                // Wrap in quotes to safely escape commas inside doc fields
                let row = `"${log.refId}","${log.docType}","${log.date}","₱${log.fee}.00","${paymentStatus}","${paymentMethod}"`;
                csvContent += row + "\r\n";
            });

            // Set up UTF-8 BOM byte marker so Excel recognizes special characters (₱)
            const bom = "\uFEFF";
            const blob = new Blob([bom + csvContent], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            
            link.setAttribute("href", url);
            link.setAttribute("download", `Brgy_Sto_Nino_Kiosk_Records_${new Date().toISOString().slice(0,10)}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        function clearAllAdminLogs() {
            playSound("error");
            localStorage.removeItem("barangay_kiosk_logs");
            updateAdminDashboardData();
            openMessageBox("Database Cleared", "The local browser storage log database has been successfully wiped.", "success");
        }

        // --- ADMIN LOGIN CONTROLLER ---
        function showAdminLogin() {
            playSound("tap");
            document.getElementById("admin-username").value = "";
            document.getElementById("admin-password").value = "";
            nav("page-admin-login");
        }

        function verifyAdminLogin() {
            const user = document.getElementById("admin-username").value.trim();
            const pass = document.getElementById("admin-password").value.trim();

            const targetUser = localStorage.getItem("admin_username");
            const targetPass = localStorage.getItem("admin_password");

            if (user === targetUser && pass === targetPass) {
                playSound("success");
                updateAdminDashboardData();
                nav("page-admin-dashboard");
            } else {
                playSound("error");
                openMessageBox("Authentication Failed", "Incorrect administrator username or password entered. Please try again.", "error");
                document.getElementById("admin-password").value = "";
            }
        }

        function logoutAdmin() {
            playSound("tap");
            nav("page-landing");
        }

        // Password input secure visibility switcher
        function togglePasswordVisibility(fieldId) {
            playSound("tap");
            const input = document.getElementById(fieldId);
            const eye = document.getElementById(`${fieldId}-eye`);
            if (input.type === "password") {
                input.type = "text";
                eye.classList.remove("fa-eye");
                eye.classList.add("fa-eye-slash");
            } else {
                input.type = "password";
                eye.classList.remove("fa-eye-slash");
                eye.classList.add("fa-eye");
            }
        }

        // --- ADMIN CREDENTIAL EDITORS ---
        function openCredentialsModal() {
            playSound("tap");
            document.getElementById("new-admin-user").value = "";
            document.getElementById("new-admin-pass").value = "";
            document.getElementById("confirm-admin-pass").value = "";
            
            document.getElementById("modal-admin-credentials").classList.remove("hidden");
        }

        function closeCredentialsModal() {
            playSound("tap");
            document.getElementById("modal-admin-credentials").classList.add("hidden");
        }

        function saveAdminCredentials() {
            const newUser = document.getElementById("new-admin-user").value.trim();
            const newPass = document.getElementById("new-admin-pass").value.trim();
            const confirmPass = document.getElementById("confirm-admin-pass").value.trim();

            if (!newUser || !newPass || !confirmPass) {
                playSound("error");
                openMessageBox("Validation Error", "All fields are required to update settings.", "error");
                return;
            }

            if (newPass !== confirmPass) {
                playSound("error");
                openMessageBox("Mismatch Error", "New password and password confirmation entries do not match.", "error");
                return;
            }

            // Save new credentials locally inside browser storage
            localStorage.setItem("admin_username", newUser);
            localStorage.setItem("admin_password", newPass);
            
            closeCredentialsModal();
            playSound("success");
            openMessageBox("Credentials Updated", "System administrative login settings updated successfully.", "success");
        }

        // --- MESSAGE BOX HANDLER ---
        function openMessageBox(title, text, type) {
            const box = document.getElementById("custom-message-box");
            const card = document.getElementById("msg-card");
            const icon = document.getElementById("msg-icon");
            const iconContainer = document.getElementById("msg-icon-container");

            document.getElementById("msg-title").innerText = title;
            document.getElementById("msg-text").innerText = text;

            if(type === "success") {
                iconContainer.className = "h-16 w-16 mx-auto flex items-center justify-center text-3xl rounded-2xl mb-4 bg-emerald-100 text-emerald-600 animate-bounce";
                icon.className = "fa-solid fa-circle-check";
            } else if(type === "error") {
                iconContainer.className = "h-16 w-16 mx-auto flex items-center justify-center text-3xl rounded-2xl mb-4 bg-red-100 text-red-600 animate-pulse";
                icon.className = "fa-solid fa-circle-xmark";
            } else {
                iconContainer.className = "h-16 w-16 mx-auto flex items-center justify-center text-3xl rounded-2xl mb-4 bg-teal-100 text-teal-600";
                icon.className = "fa-solid fa-circle-info";
            }

            box.classList.remove("hidden");
            card.classList.remove("scale-95");
            card.classList.add("scale-100");
        }

        function closeMessageBox() {
            playSound("tap");
            document.getElementById("custom-message-box").classList.add("hidden");
        }

        // --- TIMING ENGINE ---
        function updateClock() {
            const timeSpan = document.getElementById("live-time-display");
            const dateSpan = document.getElementById("screensaver-full-date");

            const now = new Date();
            timeSpan.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            dateSpan.innerText = now.toLocaleDateString('en-US', options);
        }

        // Simulated AI purpose enhancement helper
        function enhancePurpose(id) {
            playSound("success");
            const input = document.getElementById(id);
            if(input && input.value) {
                let text = input.value.trim().toLowerCase();
                if(text === 'job' || text === 'trabaho' || text === 'work') {
                    input.value = "For local employment application and background verification requirements";
                } else if(text === 'medical' || text === 'gamot' || text === 'medikal') {
                    input.value = "To support medical financial assistance subsidy requests";
                } else if(text === 'school' || text === 'eskwela' || text === 'scholarship') {
                    input.value = "For educational scholarship enrollment validation and tuition support";
                } else {
                    input.value = "To fulfill official administrative transaction requirements";
                }
                input.dispatchEvent(new Event('input', { bubbles: true }));
                openMessageBox("Purpose Enhanced!", "The AI has rephrased your entry into professional government-recognized formatting.", "success");
            } else {
                openMessageBox("Input Required", "Please write a simple term (e.g. 'job') before requesting AI enhancement.", "info");
            }
        }

        // Simulated AI Business Name analyzer
        function analyzeBusinessName() {
            playSound("success");
            const bizInput = document.getElementById("input-business-name");
            const natureSelect = document.getElementById("input-business-nature");
            if(bizInput && bizInput.value && natureSelect && natureSelect.value) {
                openMessageBox("AI Business Audit", `"${bizInput.value}" looks highly appropriate for a "${natureSelect.value}" enterprise! Approved for local operations.`, "success");
            } else {
                openMessageBox("Incomplete Fields", "Please specify both the Business Name and Nature of Business first.", "info");
            }
        }

        setInterval(updateClock, 1000);
        updateClock(); 