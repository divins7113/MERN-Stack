document.addEventListener('DOMContentLoaded', function() {
    const topmarginSlider = document.getElementById('top-margin');
    const bottommarginSlider = document.getElementById('bottom-margin');
    const leftmarginSlider = document.getElementById('left-margin');
    const rightmarginSlider = document.getElementById('right-margin');
    const borderSlider = document.getElementById('border');
    const paddingSlider = document.getElementById('padding');
    const boxExample = document.querySelector('.box-model-example');
    
    const topmarginValue = document.getElementById('top-margin-value');
    const bottommarginValue = document.getElementById('bottom-margin-value');
    const leftmarginValue = document.getElementById('left-margin-value');
    const rightmarginValue = document.getElementById('right-margin-value');
    const borderValue = document.getElementById('border-value');
    const paddingValue = document.getElementById('padding-value');
    
    topmarginSlider.addEventListener('input', function() {
        const value = this.value + 'px';
        boxExample.style.marginTop = value;
        topmarginValue.textContent = value;
    });

    bottommarginSlider.addEventListener('input', function() {
        const value = this.value + 'px';
        boxExample.style.marginBottom = value;
        bottommarginValue.textContent = value;
    });

    leftmarginSlider.addEventListener('input', function() {
        const value = this.value + 'px';
        boxExample.style.marginLeft = value;
        leftmarginValue.textContent = value;
    });

    rightmarginSlider.addEventListener('input', function() {
        const value = this.value + 'px';
        boxExample.style.marginRight = value;
        rightmarginValue.textContent = value;
    });
    
    borderSlider.addEventListener('input', function() {
        const value = this.value + 'px';
        boxExample.style.borderWidth = value;
        borderValue.textContent = value;
    });
    
    paddingSlider.addEventListener('input', function() {
        const value = this.value + 'px';
        boxExample.style.padding = value;
        paddingValue.textContent = value;
    });
});
