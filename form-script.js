document.addEventListener('DOMContentLoaded', function() {
    const mainRequestForm = document.getElementById('mainRequestForm');
    const requestTypeRadios = document.querySelectorAll('input[name="request-type"]');
    const dynamicSections = document.querySelectorAll('.dynamic-section');
    const clearDynamicSectionButtons = document.querySelectorAll('.clear-dynamic-section');

    function toggleDynamicSections() {
        const selectedType = document.querySelector('input[name="request-type"]:checked')?.value;

        dynamicSections.forEach(section => {
            section.classList.add('hidden');
            section.classList.remove('active');
            section.querySelectorAll('input, textarea, select').forEach(input => {
                input.classList.remove('error');
                input.required = false;
            });
            section.querySelectorAll('.form-group').forEach(group => group.classList.remove('error-group'));
        });

        const sectionIdMap = {
            'document': 'documentDetails',
            'permit': 'permitDetails',
            'socialServices': 'socialServicesDetails',
            'otherServices': 'otherServicesDetails',
            'complain': 'complainDetails'
        };

        const sectionId = sectionIdMap[selectedType];
        if (sectionId) {
            const section = document.getElementById(sectionId);
            if (section) {
                section.classList.remove('hidden');
                section.classList.add('active');
                section.querySelectorAll('input[required], textarea[required], select[required]').forEach(input => input.required = true);
            }
        }

        toggleNestedDynamicSections();
        updateRequiredAttributes();
    }

    function toggleNestedDynamicSections() {
        const selectedDocType = document.querySelector('input[name="document-type"]:checked')?.value;
        const documentReasonsSection = document.getElementById('documentReasons');

        if (documentReasonsSection) {
            if (!selectedDocType || !document.getElementById('documentDetails').classList.contains('active')) {
                documentReasonsSection.classList.add('hidden');
                documentReasonsSection.classList.remove('active');
                documentReasonsSection.querySelectorAll('input[required]').forEach(input => input.required = false);
                documentReasonsSection.querySelectorAll('.form-group').forEach(group => group.classList.remove('error-group'));
            } else {
                documentReasonsSection.classList.remove('hidden');
                documentReasonsSection.classList.add('active');
                documentReasonsSection.querySelectorAll('input[required]').forEach(input => input.required = true);
            }
        }
    }

    function toggleOtherInputField(event) {
        const otherInput = event.target.closest('.radio-option, .checkbox-option')?.querySelector('.other-input');
        if (otherInput) {
            event.target.closest('.radio-group, .checkbox-group').querySelectorAll('.other-input').forEach(input => {
                input.style.display = 'none';
                input.required = false;
                input.value = '';
                input.classList.remove('error');
                input.closest('.form-group')?.classList.remove('error-group');
            });

            if (event.target.checked) {
                otherInput.style.display = 'block';
                otherInput.required = true;
            }
        } else {
            event.target.closest('.radio-group, .checkbox-group')?.querySelectorAll('.other-input').forEach(input => {
                input.style.display = 'none';
                input.required = false;
                input.value = '';
                input.classList.remove('error');
                input.closest('.form-group')?.classList.remove('error-group');
            });
        }
    }

    document.querySelectorAll('.radio-group input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', toggleOtherInputField);
    });

    document.querySelectorAll('.radio-group').forEach(group => {
        const checkedRadio = group.querySelector('input[type="radio"]:checked');
        if (checkedRadio && checkedRadio.closest('.has-other-input')) {
            checkedRadio.closest('.has-other-input').querySelector('.other-input').style.display = 'block';
            checkedRadio.closest('.has-other-input').querySelector('.other-input').required = true;
        }
    });

    function updateRequiredAttributes() {
        document.querySelectorAll('.dynamic-section').forEach(section => {
            const inputs = section.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                if (section.classList.contains('active') && !input.classList.contains('other-input') || (input.classList.contains('other-input') && input.style.display === 'block')) {
                    input.required = true;
                } else {
                    input.required = false;
                }
            });
        });

        const requestTypeRadios = document.querySelectorAll('input[name="request-type"]');
        let requestTypeRequired = false;
        requestTypeRadios.forEach(radio => {
            if (radio.checked) {
                requestTypeRequired = true;
            }
        });
        requestTypeRadios.forEach(radio => {
            radio.required = !requestTypeRequired;
        });
        if (!requestTypeRequired) {
            requestTypeRadios.forEach(radio => radio.required = true);
        }
    }

    requestTypeRadios.forEach(radio => {
        radio.addEventListener('change', toggleDynamicSections);
        radio.addEventListener('change', updateRequiredAttributes);
    });

    document.querySelectorAll('input[name="document-type"]').forEach(radio => {
        radio.addEventListener('change', toggleNestedDynamicSections);
    });

    clearDynamicSectionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.dataset.section;
            const section = document.getElementById(sectionId);
            if (section) {
                section.querySelectorAll('input, textarea, select').forEach(input => {
                    input.value = '';
                    input.classList.remove('error');
                });

                section.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(input => {
                    input.checked = false;
                    input.classList.remove('error');
                    input.closest('.form-group')?.classList.remove('error-group');
                });

                section.querySelectorAll('.other-input').forEach(input => {
                    input.style.display = 'none';
                    input.required = false;
                    input.value = '';
                    input.classList.remove('error');
                    input.closest('.form-group')?.classList.remove('error-group');
                });

                if (sectionId === 'documentDetails') {
                    document.getElementById('documentReasons')?.classList.add('hidden');
                    document.getElementById('documentReasons')?.classList.remove('active');
                    document.getElementById('documentReasons')?.querySelectorAll('input').forEach(input => input.required = false);
                }

                updateRequiredAttributes();
            }
        });
    });

    toggleDynamicSections();
    updateRequiredAttributes();
});
