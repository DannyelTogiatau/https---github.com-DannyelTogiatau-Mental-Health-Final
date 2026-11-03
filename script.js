function showPage(pageName, clickedButton) {
    const views = document.querySelectorAll('.page-view');
    views.forEach(view => {
        view.classList.remove('active');
    });

    const buttons = document.querySelectorAll('.nav-button');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });

    const selectedView = document.getElementById(`view-${pageName}`);
    if (selectedView) {
        selectedView.classList.add('active');
    }
    if (clickedButton) {
        clickedButton.classList.add('active');
    }

 
    if (pageName !== 'breathing' && isBreathing) {
        toggleBreathing();
    }
}


let isBreathing = false;
let phaseTimeout;
let countdownInterval;

function toggleBreathing() {
    const circle = document.getElementById('breathCircle');
    const instruction = document.getElementById('breathInstruction');
    const timer = document.getElementById('breathTimer');
    const btn = document.getElementById('breathBtn');

    if (isBreathing) {
        clearTimeout(phaseTimeout);
        clearInterval(countdownInterval);
        circle.style.transform = 'scale(1)';
        circle.style.transition = 'transform 0.5s ease-out';
        instruction.innerText = 'Ready';
        timer.innerText = '';
        btn.innerText = 'Start Exercise';
        isBreathing = false;
        return;
    }

    isBreathing = true;
    btn.innerText = 'Stop Exercise';
    runCycle();
}

function runCycle() {
    if (!isBreathing) return;

    const circle = document.getElementById('breathCircle');
    const instruction = document.getElementById('breathInstruction');

   
    instruction.innerText = 'Inhale...';
    circle.style.transition = 'transform 4s ease-in-out';
    circle.style.transform = 'scale(1.5)';
    startCountdown(4);

    phaseTimeout = setTimeout(() => {
        if (!isBreathing) return;


        instruction.innerText = 'Hold...';
        circle.style.transition = 'none';
        startCountdown(4);

        phaseTimeout = setTimeout(() => {
            if (!isBreathing) return;

         
            instruction.innerText = 'Exhale...';
            circle.style.transition = 'transform 4s ease-in-out';
            circle.style.transform = 'scale(1)';
            startCountdown(4);

            phaseTimeout = setTimeout(() => {
                if (!isBreathing) return;

             
                instruction.innerText = 'Hold...';
                circle.style.transition = 'none';
                startCountdown(4);

                phaseTimeout = setTimeout(() => {
                    if (isBreathing) {
                        runCycle();
                    }
                }, 4000);
            }, 4000);       
        }, 4000);
    }, 4000);
}   

function startCountdown(seconds) {
    const timer = document.getElementById('breathTimer');
    let timeLeft = seconds;
    timer.innerText = timeLeft;

    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft > 0) {
            timer.innerText = timeLeft;
        } else {
            clearInterval(countdownInterval);
        }
    }, 1000);
}

