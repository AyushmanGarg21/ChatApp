
const SpeakText = (text) => {

    if (text !== '') {
        if ('speechSynthesis' in window) {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        synth.cancel(); // Clear any existing utterances
        synth.speak(utterance);
        } else {
        console.error('Speech synthesis not supported');
        }
    }
};

export default SpeakText;