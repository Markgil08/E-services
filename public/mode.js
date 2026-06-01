        // State variables
        let currentLanguage = 'en';
        let lastOpenedFormPageId = '';
        let activeKioskFormDoc = '';
        let activeKioskFormFee = 0;

        // Translation Dictionary (English / Tagalog)
        const translations = {
            'en': {
                'select-doc': 'SELECT DOCUMENT',
                'welcome': 'Welcome to Brgy. Sto. Niño E-Services',
                'subwelcome': 'Please choose the document you would like to process today.',
                'clearance-title': 'Barangay Clearance',
                'clearance-desc': 'Good moral standing, travel or employment.',
                'indigency-title': 'Certificate of Indigency',
                'indigency-desc': 'Financial aid, scholarship, and healthcare.',
                'residency-title': 'Certificate of Residency',
                'residency-desc': 'Valid proof of home residency.',
                'business-title': 'Barangay Business Permit',
                'business-desc': 'License permit to run a local business entity.',
                'screensaver-btn': 'Screensaver',
                'help-assist': 'Kiosk Assistant',
                'review-badge': 'REVIEW ENTERED DATA',
                'review-title': 'Verify Transaction Details',
                'review-sub': 'Please confirm that all typed information matches your valid credentials perfectly.',
                'sum-hdr': 'Entered Records',
                'sum-doc': 'Document:',
                'sum-name': 'Full Name:',
                'sum-addr': 'Address:',
                'sum-bdate': 'Birthdate:',
                'sum-status': 'Civil Status:',
                'sum-purpose': 'Purpose / Info:',
                'sum-notice': 'Notice: Double-check all spellings. Errors cannot be corrected once printed.',
                'ledger-hdr': 'FEE SUMMARY',
                'leg-type': 'Base Document Fee:',
                'leg-charge': 'Convenience Charge:',
                'leg-total': 'Total Amount Due:',
                'leg-disclosure': 'By clicking Confirm, you authorize the generation of this transaction log inside the Barangay Sto. Niño document server network.',
                'btn-edit': 'Edit Details (Bumalik)',
                'btn-confirm': 'Confirm & Print Receipt',
                'success-title': 'Transaction Submitted!',
                'success-sub': 'Your application has been logged on the barangay master database. Your thermal transaction receipt is currently printing at the bottom slot of the machine.',
                'success-instruct-title': 'What to do next:',
                'success-instruct-desc': 'Present this printed receipt at the Cashier Window of Barangay Sto. Niño Hall to process your final cash payment and pick up your official certified document.',
                'success-done': 'Done & Return Home',
                'ai-title': 'Sto. Niño Kiosk AI',
                'ai-greet': 'Good day! I am your Kiosk AI Assistant. Do you have questions about Barangay Sto. Niño services? Tap any of the quick prompts below.',
                'quick-q': 'Quick Questions',
                'fee-clr': 'Total Processing Fee:',
                'fee-ind': 'Total Processing Fee:',
                'fee-res': 'Total Processing Fee:',
                'fee-biz': 'Total Processing Fee:',
                'title-clr': 'Apply: Barangay Clearance',
                'title-ind': 'Apply: Certificate of Indigency',
                'title-res': 'Apply: Certificate of Residency',
                'title-biz': 'Apply: Barangay Business Permit',
                'sub-clr': 'Provide correct details to process application',
                'sub-ind': 'Provide correct details to process application',
                'sub-res': 'Provide correct details to process application',
                'sub-biz': 'Provide correct details to process application',
                'lbl-fn': 'Full Name (Buong Pangalan)',
                'lbl-adr': 'Home Address (Tirahan)',
                'lbl-bd': 'Birthdate (Araw ng Kapanganakan)',
                'lbl-cs': 'Civil Status (Katayuang Sibil)',
                'lbl-prp': 'Purpose (Layunin)',
                'lbl-biz-fn': 'Applicant / Owner Name (May-ari)',
                'lbl-biz-adr': 'Business Address (Lokasyon ng Negosyo)',
                'lbl-biz-prp': 'Nature of Business / Store Name (Uri ng Negosyo)',
                'btn-cancel': 'Cancel',
                'btn-proceed': 'Review & Proceed'
            },
            'ph': {
                'select-doc': 'PUMILI NG DOKUMENTO',
                'welcome': 'Maligayang Pagdating sa Brgy. Sto. Niño',
                'subwelcome': 'Mangyaring piliin ang dokumento na nais mong i-proseso ngayon.',
                'clearance-title': 'Barangay Clearance',
                'clearance-desc': 'Katunayan ng mabuting asal, paglalakbay o trabaho.',
                'indigency-title': 'Katunayan ng Pagiging Kapus-palad',
                'indigency-desc': 'Para sa tulong pinansyal, iskolarship, at medikal.',
                'residency-title': 'Katunayan ng Pagkapermanente',
                'residency-desc': 'Balidong katunayan ng tirahan sa barangay.',
                'business-title': 'Barangay Permit sa Negosyo',
                'business-desc': 'Lisensya para makapagpatakbo ng lokal na negosyo.',
                'screensaver-btn': 'Screensaver',
                'help-assist': 'Tulong Gabay',
                'review-badge': 'SURIIN ANG DETALYE',
                'review-title': 'I-verify ang mga Detalye',
                'review-sub': 'Mangyaring suriin kung ang lahat ng nakasulat ay tumutugma sa iyong mga tunay na dokumento.',
                'sum-hdr': 'Mga Nakatalang Impormasyon',
                'sum-doc': 'Dokumento:',
                'sum-name': 'Buong Pangalan:',
                'sum-addr': 'Tirahan:',
                'sum-bdate': 'Kapanganakan:',
                'sum-status': 'Katayuang Sibil:',
                'sum-purpose': 'Layunin / Info:',
                'sum-notice': 'Babala: Suriin ang lahat ng baybay. Hindi na mababago kapag na-print na.',
                'ledger-hdr': 'BUOD NG BAYAD',
                'leg-type': 'Presyo ng Dokumento:',
                'leg-charge': 'Bayad sa Serbisyo:',
                'leg-total': 'Kabuuang Halaga:',
                'leg-disclosure': 'Sa pag-click ng Kumpirmahin, pinapahintulutan mo ang paglikha ng transaksyong ito sa server network ng Barangay Sto. Niño.',
                'btn-edit': 'Baguhin ang Detalye',
                'btn-confirm': 'Kumpirmahin at I-print',
                'success-title': 'Matagumpay na Naisumite!',
                'success-sub': 'Ang iyong aplikasyon ay matagumpay na naitala. Ang iyong resibo ay kasalukuyang pino-proseso at pini-print na ng makina.',
                'success-instruct-title': 'Ang susunod na hakbang:',
                'success-instruct-desc': 'Ipakita ang naka-print na resibo sa Cashier Window ng Barangay Sto. Niño Hall upang magbayad at makuha ang iyong opisyal na dokumento.',
                'success-done': 'Tapusin at Bumalik sa Simula',
                'ai-title': 'Sto. Niño Kiosk AI',
                'ai-greet': 'Magandang araw! Ako ang inyong Kiosk AI Assistant. May mga tanong ba kayo ukol sa mga dokumento ng Barangay? Piliin ang mabilis na tanong sa ibaba.',
                'quick-q': 'Mga Mabilis na Tanong',
                'fee-clr': 'Kabuuang Bayarin:',
                'fee-ind': 'Kabuuang Bayarin:',
                'fee-res': 'Kabuuang Bayarin:',
                'fee-biz': 'Kabuuang Bayarin:',
                'title-clr': 'Mag-apply: Barangay Clearance',
                'title-ind': 'Mag-apply: Katunayan ng Indigency',
                'title-res': 'Mag-apply: Katunayan ng Residency',
                'title-biz': 'Mag-apply: Barangay Business Permit',
                'sub-clr': 'Ibigay ang tamang detalye para sa aplikasyon',
                'sub-ind': 'Ibigay ang tamang detalye para sa aplikasyon',
                'sub-res': 'Ibigay ang tamang detalye para sa aplikasyon',
                'sub-biz': 'Ibigay ang tamang detalye para sa aplikasyon',
                'lbl-fn': 'Buong Pangalan',
                'lbl-adr': 'Tirahan',
                'lbl-bd': 'Araw ng Kapanganakan',
                'lbl-cs': 'Katayuang Sibil',
                'lbl-prp': 'Layunin',
                'lbl-biz-fn': 'Pangalan ng May-ari',
                'lbl-biz-adr': 'Lokasyon ng Negosyo',
                'lbl-biz-prp': 'Uri ng Negosyo / Pangalan ng Tindahan',
                'btn-cancel': 'I-cancel',
                'btn-proceed': 'Suriin at Magpatuloy'
            }
        };

        // Initialize KioskBoard Virtual Keyboard on Window Load
        window.addEventListener('DOMContentLoaded', () => {
            KioskBoard.init({
                keysArrayOfObjects: null, // default QWERTY layout
                language: 'en',
                theme: 'dark',
                allowRealKeyboard: true,
                autoTrigger: true,
                keysFontFamily: 'Inter'
            });

            KioskBoard.run('.virtual-keyboard');
            
            // Start clock timer
            updateLiveClock();
            setInterval(updateLiveClock, 1000);
        });

        // Toggle Application Language
        function toggleLanguage(lang) {
            currentLanguage = lang;
            
            // Switch active buttons state
            if (lang === 'en') {
                $('#lang-btn-en').addClass('bg-teal-600 text-white').removeClass('bg-white text-slate-700 border hover:bg-slate-50');
                $('#lang-btn-ph').addClass('bg-white text-slate-700 border hover:bg-slate-50').removeClass('bg-teal-600 text-white');
                $('#lang-indicator').html('<i class="fa-solid fa-globe text-teal-600 animate-pulse"></i> <span class="font-semibold">English Mode</span>');
            } else {
                $('#lang-btn-ph').addClass('bg-teal-600 text-white').removeClass('bg-white text-slate-700 border hover:bg-slate-50');
                $('#lang-btn-en').addClass('bg-white text-slate-700 border hover:bg-slate-50').removeClass('bg-teal-600 text-white');
                $('#lang-indicator').html('<i class="fa-solid fa-globe text-teal-600 animate-pulse"></i> <span class="font-semibold">Tagalog Mode</span>');
            }

            // Translate static DOM strings
            $('#lang-select-doc').text(translations[lang]['select-doc']);
            $('#lang-welcome').text(translations[lang]['welcome']);
            $('#lang-subwelcome').text(translations[lang]['subwelcome']);
            $('#lang-clearance-title').text(translations[lang]['clearance-title']);
            $('#lang-clearance-desc').text(translations[lang]['clearance-desc']);
            $('#lang-indigency-title').text(translations[lang]['indigency-title']);
            $('#lang-indigency-desc').text(translations[lang]['indigency-desc']);
            $('#lang-residency-title').text(translations[lang]['residency-title']);
            $('#lang-residency-desc').text(translations[lang]['residency-desc']);
            $('#lang-business-title').text(translations[lang]['business-title']);
            $('#lang-business-desc').text(translations[lang]['business-desc']);
            $('#lang-screensaver-btn').text(translations[lang]['screensaver-btn']);
            $('#lang-help-assist').text(translations[lang]['help-assist']);
            
            $('#lang-review-badge').text(translations[lang]['review-badge']);
            $('#lang-review-title').text(translations[lang]['review-title']);
            $('#lang-review-sub').text(translations[lang]['review-sub']);
            $('#lang-sum-hdr').text(translations[lang]['sum-hdr']);
            
            $('#sum-doc').text(translations[lang]['sum-doc']);
            $('#sum-name').text(translations[lang]['sum-name']);
            $('#sum-addr').text(translations[lang]['sum-addr']);
            $('#sum-bdate').text(translations[lang]['sum-bdate']);
            $('#sum-status').text(translations[lang]['sum-status']);
            $('#sum-purpose').text(translations[lang]['sum-purpose']);
            
            $('#lang-sum-notice').text(translations[lang]['sum-notice']);
            $('#lang-ledger-hdr').text(translations[lang]['ledger-hdr']);
            $('#lang-leg-type').text(translations[lang]['leg-type']);
            $('#lang-leg-charge').text(translations[lang]['leg-charge']);
            $('#lang-leg-total').text(translations[lang]['leg-total']);
            $('#lang-leg-disclosure').text(translations[lang]['leg-disclosure']);
            
            $('#btn-edit-back').text(translations[lang]['btn-edit']);
            $('#btn-confirm-print').text(translations[lang]['btn-confirm']);
            
            $('#lang-success-title').text(translations[lang]['success-title']);
            $('#lang-success-sub').text(translations[lang]['success-sub']);
            $('#lang-success-instruct-title').text(translations[lang]['success-instruct-title']);
            $('#lang-success-instruct-desc').text(translations[lang]['success-instruct-desc']);
            $('#btn-success-done').text(translations[lang]['success-done']);
            
            $('#lang-ai-title').text(translations[lang]['ai-title']);
            $('#lang-ai-greet').text(translations[lang]['ai-greet']);
            $('#lang-quick-q').text(translations[lang]['quick-q']);
            
            // Translate Dynamic Form Page Elements
            $('#lang-fee-clr').text(translations[lang]['fee-clr']);
            $('#lang-fee-ind').text(translations[lang]['fee-ind']);
            $('#lang-fee-res').text(translations[lang]['fee-res']);
            $('#lang-fee-biz').text(translations[lang]['fee-biz']);
            
            $('#form-title-clearance').text(translations[lang]['title-clr']);
            $('#form-title-indigency').text(translations[lang]['title-ind']);
            $('#form-title-residency').text(translations[lang]['title-res']);
            $('#form-title-business').text(translations[lang]['title-biz']);
            
            $('#form-subtitle-clearance').text(translations[lang]['sub-clr']);
            $('#form-subtitle-indigency').text(translations[lang]['sub-ind']);
            $('#form-subtitle-residency').text(translations[lang]['sub-res']);
            $('#form-subtitle-business').text(translations[lang]['sub-biz']);
            
            // Inputs for Forms 1-3
            ['1', '2', '3'].forEach(num => {
                $(`#lbl-fullname-${num}`).text(translations[lang]['lbl-fn']);
                $(`#lbl-address-${num}`).text(translations[lang]['lbl-adr']);
                $(`#lbl-bdate-${num}`).text(translations[lang]['lbl-bd']);
                $(`#lbl-status-${num}`).text(translations[lang]['lbl-cs']);
                $(`#lbl-purpose-${num}`).text(translations[lang]['lbl-prp']);
                $(`#btn-cancel-${num}`).text(translations[lang]['btn-cancel']);
                $(`#btn-proceed-${num}`).text(translations[lang]['btn-proceed']);
            });

            // Input for Form 4 (Business Permit)
            $('#lbl-fullname-4').text(translations[lang]['lbl-biz-fn']);
            $('#lbl-address-4').text(translations[lang]['lbl-biz-adr']);
            $('#lbl-bdate-4').text(translations[lang]['lbl-bd']);
            $('#lbl-status-4').text(translations[lang]['lbl-cs']);
            $('#lbl-purpose-4').text(translations[lang]['lbl-biz-prp']);
            $('#btn-cancel-4').text(translations[lang]['btn-cancel']);
            $('#btn-proceed-4').text(translations[lang]['btn-proceed']);
        }

        // Clock Update Logic
        function updateLiveClock() {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
            const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const dateString = now.toLocaleDateString('en-US', dateOptions);
            
            $('#live-time-display').text(timeString);
            $('#screensaver-full-date').text(dateString);
        }

        // View Router
        function showPage(pageId) {
            const pages = [
                'page-landing', 
                'page-form-clearance', 
                'page-form-indigency', 
                'page-form-residency', 
                'page-form-business',
                'page-verification',
                'page-success'
            ];

            // Hide all pages
            pages.forEach(id => {
                $(`#${id}`).removeClass('flex').addClass('hidden');
            });

            // Show target page with animation classes
            const targetPage = $(`#${pageId}`);
            if (targetPage.length) {
                targetPage.removeClass('hidden').addClass('flex');
            }
        }

        // Screensaver Logic
        function wakeUpKiosk() {
            $('#page-screensaver').addClass('opacity-0 pointer-events-none');
            setTimeout(() => {
                $('#page-screensaver').addClass('hidden');
                showPage('page-landing');
            }, 700);
        }

        function switchToScreensaver() {
            $('#page-screensaver').removeClass('hidden opacity-0 pointer-events-none');
            showPage('page-landing');
        }

        // Form Submit Handler
        function submitHardcodedData(docType, fee, inputSelector) {
            // Check form validation
            let isValid = true;
            let firstInvalid = null;
            
            $(inputSelector).each(function() {
                if ($(this).attr('required') && !$(this).val()) {
                    isValid = false;
                    if (!firstInvalid) firstInvalid = $(this);
                }
            });

            if (!isValid) {
                // Focus first invalid element to trigger keyboard helper
                if (firstInvalid) firstInvalid.focus();
                return;
            }

            // Save variables for edit recovery
            activeKioskFormDoc = docType;
            activeKioskFormFee = fee;
            lastOpenedFormPageId = $(inputSelector).closest('.absolute').attr('id');

            // Setup review screen inputs
            $('#summary-doc-type').text(docType);
            $('#summary-doc-fee-raw').text('₱' + parseFloat(fee).toFixed(2));
            $('#summary-fee').text('₱' + parseFloat(fee).toFixed(2));

            // Populate text review details
            $(inputSelector).each(function() {
                const key = $(this).attr('data-key');
                const val = $(this).val().trim() || '--';

                if (key === 'Full Name') $('#summary-name').text(val);
                if (key === 'Address') $('#summary-address').text(val);
                if (key === 'Civil Status') $('#summary-status').text(val);
                if (key === 'Purpose') $('#summary-purpose').text(val);
                
                if (key === 'Birthdate') {
                    if (val !== '--') {
                        const dateObj = new Date(val);
                        $('#summary-bdate').text(dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
                    } else {
                        $('#summary-bdate').text('--');
                    }
                }
            });

            showPage('page-verification');
        }

        // Back to active form
        function editDocument() {
            if (lastOpenedFormPageId) {
                showPage(lastOpenedFormPageId);
            } else {
                showPage('page-landing');
            }
        }

        // Finalize transaction and simulate print layout
        function processTransaction() {
            // Generate unique transaction reference
            const randomID = 'SN-' + Math.floor(1000 + Math.random() * 9000) + '-' + Math.floor(1000 + Math.random() * 9000);
            const now = new Date();
            const dateStamp = now.toLocaleDateString() + ' ' + now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
            
            // Build thermal receipt layout
            $('#receipt-ref-id').text(randomID);
            $('#receipt-printed-date').text(dateStamp);
            $('#receipt-doc-name').text(activeKioskFormDoc);
            $('#receipt-doc-fee').text('₱' + parseFloat(activeKioskFormFee).toFixed(2));

            // Generate receipt dynamic data blocks
            let recordsHTML = `
                <div class="flex justify-between">
                    <span>NAME:</span>
                    <span class="text-right max-w-[150px] truncate font-bold">${$('#summary-name').text()}</span>
                </div>
                <div class="flex justify-between">
                    <span>ADDR:</span>
                    <span class="text-right max-w-[150px] truncate">${$('#summary-address').text()}</span>
                </div>
                <div class="flex justify-between">
                    <span>BDAY:</span>
                    <span>${$('#summary-bdate').text()}</span>
                </div>
                <div class="flex justify-between">
                    <span>CIVIL:</span>
                    <span>${$('#summary-status').text()}</span>
                </div>
                <div class="flex justify-between">
                    <span>PURP:</span>
                    <span class="text-right max-w-[150px] truncate font-bold">${$('#summary-purpose').text()}</span>
                </div>
            `;
            $('#receipt-dynamic-inputs').html(recordsHTML);

            showPage('page-success');

            // Trigger physical simulation progress bar
            let progress = 0;
            const progressInterval = setInterval(() => {
                progress += 5;
                $('#printer-progress').css('width', progress + '%');
                $('#printer-status-percent').text(progress + '%');

                if (progress === 20) {
                    $('#printer-status-text').html('<i class="fa-solid fa-sync animate-spin mr-2 text-teal-500"></i> Generating Barcode ID...');
                } else if (progress === 50) {
                    $('#printer-status-text').html('<i class="fa-solid fa-print animate-pulse mr-2 text-teal-500"></i> Printing Thermal receipt...');
                } else if (progress === 80) {
                    $('#printer-status-text').html('<i class="fa-solid fa-scissors mr-2 text-teal-500"></i> Cutting receipt ticket...');
                } else if (progress >= 100) {
                    clearInterval(progressInterval);
                    $('#printer-status-text').html('<i class="fa-solid fa-check text-emerald-500 mr-2"></i> Print Job Finished!');
                }
            }, 150);
        }

        // Return everything back to normal
        function resetToHome() {
            // Empty all form fields
            $('input').val('');
            $('select').val('');
            // Return to screensaver or landing
            switchToScreensaver();
        }

        // Chat Drawer Logic
        function toggleAIAssistantDrawer(show) {
            const drawer = $('#ai-assistant-drawer');
            if (show) {
                drawer.removeClass('hidden');
                setTimeout(() => {
                    drawer.removeClass('translate-x-full');
                }, 50);
            } else {
                drawer.addClass('translate-x-full');
                setTimeout(() => {
                    drawer.addClass('hidden');
                }, 500);
            }
        }

        function askAIPrompt(promptId) {
            let question = '';
            let answer = '';

            if (promptId === 1) {
                question = "Ano ang mga kailangan para sa Barangay Clearance?";
                answer = "Para sa Barangay Clearance sa Sto. Niño, kailangan mo lamang magdala ng isa (1) valid ID. Kapag nakakuha ng resibo rito sa kiosk, pumunta sa Cashier window at magbayad ng ₱50.00.";
            } else if (promptId === 2) {
                question = "Libre ba ang Certificate of Indigency?";
                answer = "Ang Certificate of Indigency ay may discounted kiosk fee na ₱30.00. Libre ang pagproseso nito kung ito ay gagamitin para sa opisyal na tulong pinansyal mula sa DSWD o medikal na programa.";
            } else if (promptId === 3) {
                question = "Gaano katagal bago makuha ang Business Permit?";
                answer = "Karaniwang natatapos ang Barangay Business Permit sa loob ng 10-15 minuto matapos maisumite ang resibo at dokumento sa ating Counter window.";
            }

            // Append user message
            const chatHistory = $('#ai-chat-history');
            chatHistory.append(`
                <div class="flex items-start justify-end space-x-3">
                    <div class="bg-teal-600 text-white p-4 rounded-2xl shadow-sm max-w-[80%]">
                        <p class="text-sm font-semibold">${question}</p>
                    </div>
                </div>
            `);

            // Scroll down
            chatHistory.scrollTop(chatHistory[0].scrollHeight);

            // Append simulated thinking response
            setTimeout(() => {
                chatHistory.append(`
                    <div class="flex items-start space-x-3">
                        <div class="bg-teal-100 text-teal-700 p-2.5 rounded-xl">
                            <i class="fa-solid fa-robot"></i>
                        </div>
                        <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 max-w-[80%]">
                            <p class="text-sm text-slate-700 font-medium">${answer}</p>
                        </div>
                    </div>
                `);
                chatHistory.scrollTop(chatHistory[0].scrollHeight);
            }, 600);
        }