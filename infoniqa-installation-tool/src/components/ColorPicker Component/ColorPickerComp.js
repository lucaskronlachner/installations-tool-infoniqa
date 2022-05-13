import React from 'react'
import './ColorPickerStyle.css'

class ColorPickerComp extends React.Component {
    constructor(props) {
        super(props)
        this.colorPickerCanvas = React.createRef()
        this.pickerIndicator = React.createRef()
        this.selectColor = React.createRef()
        this.inputR = React.createRef()
        this.inputG = React.createRef()
        this.inputB = React.createRef()
        this.color_canvas_background = React.createRef()
        this.pickerSize = props.pickerSize
    }
    componentDidMount() {
        let dragging = false
        let pickerCanvas = this.colorPickerCanvas.current
        let doc = this
        let radiusPicker
        pickerCanvas.style.width = this.pickerSize
        pickerCanvas.style.height = this.pickerSize
        pickerCanvas.width = pickerCanvas.offsetWidth * 2
        pickerCanvas.height = pickerCanvas.offsetHeight * 2

        this.selectColor.current.onclick = () => {
            if(this.color_canvas_background.current.classList.contains('hidden')){
                this.color_canvas_background.current.classList.replace('hidden', 'shown')
            }else{
                this.color_canvas_background.current.classList.replace('shown', 'hidden')
            }
            
        }

        let pickerRGBChangeEvent = () => {
            let rgb = [parseInt(doc.inputR.current.value), parseInt(doc.inputG.current.value), parseInt(doc.inputB.current.value)]
            setPickerColorFromRGB(rgb, doc)
        }
        this.inputR.current.onchange = pickerRGBChangeEvent
        this.inputG.current.onchange = pickerRGBChangeEvent
        this.inputB.current.onchange = pickerRGBChangeEvent

        this.inputR.current.value = 255
        this.inputG.current.value = 255
        this.inputB.current.value = 255

        let ctx = pickerCanvas.getContext('2d')
        function drawCircle() {
            radiusPicker = pickerCanvas.height / 2
            let image = ctx.createImageData(2 * radiusPicker, 2 * radiusPicker);
            let data = image.data;

            for (let x = -radiusPicker; x < radiusPicker; x++) {
                for (let y = -radiusPicker; y < radiusPicker; y++) {
                    let [r, phi] = xy2polar(x, y);

                    if (r > radiusPicker + 3) {
                        // skip all (x,y) coordinates that are outside of the circle
                        continue;
                    }

                    let deg = rad2deg(phi);

                    // Figure out the starting index of this pixel in the image data array.
                    let rowLength = 2 * radiusPicker;
                    let adjustedX = x + radiusPicker; // convert x from [-50, 50] to [0, 100] (the coordinates of the image data array)
                    let adjustedY = y + radiusPicker; // convert y from [-50, 50] to [0, 100] (the coordinates of the image data array)
                    let pixelWidth = 4; // each pixel requires 4 slots in the data array
                    let index = (adjustedX + adjustedY * rowLength) * pixelWidth;

                    let hue = deg;
                    let saturation = r / radiusPicker;
                    let value = 1.0;

                    let [red, green, blue] = hsv2rgb(hue, saturation, value);
                    let alpha = 255;

                    data[index] = red;
                    data[index + 1] = green;
                    data[index + 2] = blue;
                    data[index + 3] = alpha;
                }
            }

            ctx.putImageData(image, 0, 0);
        }
        function xy2polar(x, y) {
            let r = Math.sqrt(x * x + y * y);
            let phi = Math.atan2(y, x);
            return [r, phi];
        }
        function polar2xy(radius, angle) {
            let x = Math.sin(angle) * radius
            let y = Math.cos(angle) * radius
            return [x, y];
        }

        // rad in [-π, π] range
        // return degree in [0, 360] range
        function rad2deg(rad) {
            return ((rad + Math.PI) / (2 * Math.PI)) * 360;
        }

        drawCircle();
        function hsv2rgb(hue, saturation, value) {
            let chroma = value * saturation;
            let hue1 = hue / 60;
            let x = chroma * (1 - Math.abs((hue1 % 2) - 1));
            let r1, g1, b1;
            if (hue1 >= 0 && hue1 <= 1) {
                [r1, g1, b1] = [chroma, x, 0];
            } else if (hue1 >= 1 && hue1 <= 2) {
                [r1, g1, b1] = [x, chroma, 0];
            } else if (hue1 >= 2 && hue1 <= 3) {
                [r1, g1, b1] = [0, chroma, x];
            } else if (hue1 >= 3 && hue1 <= 4) {
                [r1, g1, b1] = [0, x, chroma];
            } else if (hue1 >= 4 && hue1 <= 5) {
                [r1, g1, b1] = [x, 0, chroma];
            } else if (hue1 >= 5 && hue1 <= 6) {
                [r1, g1, b1] = [chroma, 0, x];
            }

            let m = value - chroma;
            let [r, g, b] = [r1 + m, g1 + m, b1 + m];

            // Change r,g,b values from [0,1] to [0,255]
            return [255 * r, 255 * g, 255 * b];
        }
        function rgb2Hsv(tempR, tempG, tempB) {
            let r = tempR / 255, g = tempG /255, b = tempB / 255;
            var max = Math.max(r, g, b), min = Math.min(r, g, b);
            var h, s, v = max;

            var d = max - min;
            s = max == 0 ? 0 : d / max;

            if (max == min) {
                h = 0; // achromatic
            } else {
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }

                h /= 6;
            }

            return [h, s, v];
        }
        pickerCanvas.onmousedown = (e) => {
            setPickerColor(e.pageX, e.pageY, this.pickerIndicator.current, this)
            dragging = true
            this.pickerIndicator.current.classList.add('picking')
        }
        pickerCanvas.onmousemove = (e) => {
            if (dragging){
                setPickerColor(e.pageX, e.pageY, this.pickerIndicator.current, this)
            }
        }
        document.onmouseup = (e) => {
            this.pickerIndicator.current.classList.remove('picking')
            dragging = false
        }
        function setPickerColorFromRGB(rgb, doc) {
            let boundsPicker = doc.pickerIndicator.current.getBoundingClientRect()
            let [hue, sat, val] = rgb2Hsv(rgb[0], rgb[1], rgb[2])
            console.log(sat, hue);
            let [x, y] = polar2xy(sat * radiusPicker, hue * 360)
            doc.pickerIndicator.current.style.left = `${x / 2 + radiusPicker / 2 - boundsPicker.width / 2}px`
            doc.pickerIndicator.current.style.top = `${y / 2 + radiusPicker / 2 - boundsPicker.height / 2}px`
            doc.pickerIndicator.current.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
        }
        let boundsPicker = this.pickerIndicator.current.getBoundingClientRect()
        function setPickerColor(pageX, pageY, pickerElement) {
            let bounds = pickerCanvas.getBoundingClientRect()

            let x = pageX - window.scrollX - bounds.left
            let y = pageY - window.scrollY - bounds.top
            let p = ctx.getImageData(x * 2, y * 2, 1, 1).data;
            pickerElement.style.left = `${x - boundsPicker.width / 2}px`
            pickerElement.style.top = `${y - boundsPicker.height / 2}px`
            pickerElement.style.backgroundColor = `rgba(${p[0]},${p[1]},${p[2]},${p[3]})`
            doc.selectColor.current.style.backgroundColor = `rgba(${p[0]},${p[1]},${p[2]},${p[3]})`
            let [hue, sat, val] = rgb2Hsv(p[0], p[1], p[2])
            setRGBValues(p, doc)
        }
        function setRGBValues(rgb, doc) {
            doc.inputR.current.value = rgb[0]
            doc.inputG.current.value = rgb[1]
            doc.inputB.current.value = rgb[2]
        }
        setPickerColorFromRGB([255,255,255], this)
    }
    render() {
        return (
            <div className='color-picker'>
                <div className='color-canvas-relative-container'>
                    <div ref={this.color_canvas_background} className='color-canvas-background hidden'>
                        <div className='color-picker-popup'>
                            <div className='color-canvas-container'>
                                <div ref={this.pickerIndicator} className='color-picker-indicator'></div>
                                <canvas ref={this.colorPickerCanvas} id="colorCanvas"></canvas>
                            </div>
                            <div className='color-picker-rgb'>
                                <div className='color-rgb-input'>
                                    <p>R</p>
                                    <input type='number' ref={this.inputR} className='r-input'></input>
                                </div>
                                <div className='color-rgb-input'>
                                    <p>G</p>
                                    <input type='number' ref={this.inputG} className='g-input'></input>
                                </div>
                                <div className='color-rgb-input'>
                                    <p>B</p>
                                    <input type='number' ref={this.inputB} className='b-input'></input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='color-picker-button'>
                    <p className='color-picker-title'>color1</p>
                    <div>
                        <div ref={this.selectColor} className='selected-color'></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ColorPickerComp;