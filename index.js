const context = new (window.AudioContext || window.webkitAudioContext)();

function playSound(note) {
    const oscillator = context.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(noteToFrequency(note), context.currentTime);
    oscillator.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.5);
}

function noteToFrequency(note) {
    const notes = {
        'C': 261.63,
        '#c': 277.18,
        'D': 293.66,
        '#d': 311.13,
        'E': 329.63,
        'F': 349.23,
        '#f': 369.99,
        'G': 392.00,
        '#g': 415.30,
        'A': 440.00,
        '#a': 466.16,
        'B': 493.88
    };
    return notes[note];
}

const keys = document.querySelectorAll('.key, .key[data-note^="#c"]');
keys.forEach(key => {
    const note = key.getAttribute('data-note');
    key.addEventListener('click', () => {
        playSound(note);
    });
});

const scaleSelector = document.getElementById('scaleSelector');
scaleSelector.addEventListener('change', () => {
    const selectedScale = scaleSelector.value;

    keys.forEach(key => {
        key.classList.remove('major-note');
    });

    if (selectedScale === 'major') {
        keys.forEach(key => {
            const note = key.getAttribute('data-note');
            if (isNoteInMajorScale(note)) {
                key.classList.add('major-note');
            }
        });
    }
});

function isNoteInMajorScale(note) {
    const majorScaleNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    return majorScaleNotes.includes(note);
}



