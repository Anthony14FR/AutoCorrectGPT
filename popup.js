document.addEventListener('DOMContentLoaded', function() {
    var copyButton = document.getElementById('copyButton');
    copyButton.style.display = "none";
    var copyText = document.getElementById('copyText');
    copyText.style.display = "none";

    var infoText = document.getElementById('infoText');
    var settingsButton = document.getElementById('settingsButton');
    var settingsDiv = document.getElementById('settingsDiv');
    var mainContent = document.getElementById('mainContent');
    var apiKeyInput = document.getElementById('apiKeyInput');
    var saveApiKeyButton = document.getElementById('saveApiKeyButton');

    settingsButton.addEventListener('click', function() {
        if (settingsDiv.style.display === "none") {
            settingsDiv.style.display = "block";
            mainContent.style.display = "none";
        } else {
            settingsDiv.style.display = "none";
            mainContent.style.display = "block";
        }
    });

    saveApiKeyButton.addEventListener('click', function() {
        var apiKey = apiKeyInput.value;
        if (apiKey) {
            testApiKey(apiKey).then(isValid => {
                if (isValid) {
                    chrome.storage.sync.set({ apiKey: apiKey }, function() {
                        alert('Clé API sauvegardée avec succès!');
                        settingsDiv.classList.add('hidden');
                        mainContent.classList.remove('hidden');
                    });
                } else {
                    alert('Clé API invalide. Veuillez réessayer.');
                }
            });
        } else {
            alert('Veuillez entrer une clé API valide.');
        }
    });

    checkApiKey();

    document.getElementById('correctButton').addEventListener('click', function() {
        var textInput = document.getElementById('textInput').value;
        var output = document.getElementById('correctedText');
        if (textInput) {
            getApiKey().then(apiKey => {
                if (apiKey) {
                    corriger(textInput, apiKey).then((result) => {
                        output.innerText = result;
                        output.classList.add('text-green-800');
                        copyButton.style.display = "block";
                        infoText.innerText = "Le texte a été corrigé avec succès.";
                        infoText.classList.add('text-green-800');
                    }).catch((error) => {
                        console.error('Erreur lors de la correction du texte:', error);
                        output.innerHTML = "Une erreur s'est produite lors de la correction du texte.";
                        output.classList.add('text-red-800');
                        copyButton.style.display = "none";
                    });
                } else {
                    output.innerHTML = 'Clé API non configurée. veuillez cliquer sur <i class="fas fa-cog"></i> juste en dessous pour configurer votre clé API.';
                }
            });
        } else {
            output.innerHTML = "Veuillez entrer un texte à corriger.";
        }
    }, false);

    copyButton.addEventListener('click', function() {
        var correctedText = document.getElementById('correctedText');
        var range = document.createRange();
        range.selectNode(correctedText);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        copyText.style.display = "block";
        setTimeout(function() {
            copyText.style.display = "none";
        }, 2000);
    }, false);

    document.getElementById('refomulateButton').addEventListener('click', function() {
        var textInput = document.getElementById('textInput').value;
        var output = document.getElementById('correctedText');
        if (textInput) {
            getApiKey().then(apiKey => {
                if (apiKey) {
                    reformuler(textInput, apiKey).then((result) => {
                        output.innerText = result;
                        output.classList.add('text-green-800');
                        copyButton.style.display = "block";
                        infoText.innerText = "Le texte a été reformulé avec succès.";
                        infoText.classList.add('text-green-800');
                    }).catch((error) => {
                        console.error('Erreur lors de la reformulation du texte:', error);
                        output.innerHTML = "Une erreur s'est produite lors de la reformulation du texte.";
                        output.classList.add('text-red-800');
                        copyButton.style.display = "none";
                    });
                } else {
                    output.innerHTML = "Clé API non configurée.";
                }
            });
        } else {
            output.innerHTML = "Veuillez entrer un texte à reformuler.";
        }
    }, false);
});

function checkApiKey() {
    chrome.storage.sync.get(['apiKey'], function(result) {
        if (!result.apiKey) {
            document.getElementById('mainContent').classList.add('hidden');
            document.getElementById('settingsDiv').classList.remove('hidden');
        }
    });
}

function getApiKey() {
    return new Promise((resolve) => {
        chrome.storage.sync.get(['apiKey'], function(result) {
            resolve(result.apiKey);
        });
    });
}

async function testApiKey(apiKey) {
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + apiKey
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "Test API Key" },
                    { role: "user", content: "Test" }
                ],
            })
        });

        return response.ok;
    } catch (error) {
        return false;
    }
}

async function corriger(texte, apiKey) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apiKey
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "Corrige le texte suivant sans le reformuler et réponds moi uniquement avec le texte corrigé et formaté." },
                { role: "user", content: texte }
            ],
        })
    });

    if (!response.ok) {
        throw new Error('La requête à l\'API OpenAI a échoué avec le statut ' + response.status);
    }

    const completion = await response.json();
    return completion.choices[0].message.content;
}

async function reformuler(texte, apiKey) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apiKey
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "Reformule le texte suivant. Réponds moi uniquement avec le texte reformulé et formaté." },
                { role: "user", content: texte }
            ],
        })
    });

    if (!response.ok) {
        throw new Error('La requête à l\'API OpenAI a échoué avec le statut ' + response.status);
    }

    const completion = await response.json();
    return completion.choices[0].message.content;
}
