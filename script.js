const API = "AIzaSyBZLR1uNApW7pb8DCnG3acwlB6_4WfYbYM";

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API}`;

const randomNumber = Math.floor(Math.random() * 1000);

const prompt = `Tell me a unique short funny joke. Random seed: ${randomNumber}`;

const btn = document.querySelector("button");

const para = document.getElementById("joke");

async function generateJoke() {
    
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: prompt,
                            },
                        ],
                    },
                ],
            }),
        });

        const data = await res.json();
        console.log(data);

        const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No joke returned.";
        para.innerText = aiText;
    } catch (error) {
        para.innerText = "The AI comedian slipped on a banana peel 🍌";
        console.log(error);
    }
}

btn.addEventListener("click", async () => {
    para.innerText = "Generating Joke...";
    btn.disabled = true;
    await generateJoke();
    btn.disabled = false;
});
