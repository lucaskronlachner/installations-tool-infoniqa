import React from 'react'
import './ColorPickerStyle.css'

class ColorPickerComp extends React.Component {
    constructor(props) {
        super(props)
        this.colorPickerCanvas = React.createRef()
        this.pickerIndicator = React.createRef()
        this.pickerSize = props.pickerSize
    }
    componentDidMount() {
        let dragging = false
        let pickerCanvas = this.colorPickerCanvas.current
        pickerCanvas.style.width = this.pickerSize
        pickerCanvas.style.height = this.pickerSize
        pickerCanvas.width = pickerCanvas.offsetWidth * 2
        pickerCanvas.height = pickerCanvas.offsetHeight * 2
        let ctx = pickerCanvas.getContext('2d')
        function drawCircle() {
            let radius = pickerCanvas.height / 2;
            let image = ctx.createImageData(2 * radius, 2 * radius);
            let data = image.data;

            for (let x = -radius; x < radius; x++) {
                for (let y = -radius; y < radius; y++) {
                    let [r, phi] = xy2polar(x, y);

                    if (r > radius + 3) {
                        // skip all (x,y) coordinates that are outside of the circle
                        continue;
                    }

                    let deg = rad2deg(phi);

                    // Figure out the starting index of this pixel in the image data array.
                    let rowLength = 2 * radius;
                    let adjustedX = x + radius; // convert x from [-50, 50] to [0, 100] (the coordinates of the image data array)
                    let adjustedY = y + radius; // convert y from [-50, 50] to [0, 100] (the coordinates of the image data array)
                    let pixelWidth = 4; // each pixel requires 4 slots in the data array
                    let index = (adjustedX + adjustedY * rowLength) * pixelWidth;

                    let hue = deg;
                    let saturation = r / radius;
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
        pickerCanvas.onmousedown = (e) => {
            setPickerColor(e.pageX, e.pageY, this.pickerIndicator.current)
            dragging = true
        }
        pickerCanvas.onmousemove = (e) => {
            if(dragging)
                setPickerColor(e.pageX, e.pageY, this.pickerIndicator.current)
        }
        document.onmouseup = (e) => {
            dragging = false
        }
        function setPickerColor(pageX, pageY, pickerElement) {
            let bounds = pickerCanvas.getBoundingClientRect()
            let boundsPicker = pickerElement.getBoundingClientRect()
            let x = pageX - window.scrollX - bounds.left
            let y = pageY - window.scrollY - bounds.top
            let p = ctx.getImageData(x * 2, y * 2, 1, 1).data;
            pickerElement.style.left = `${x - boundsPicker.width/2}px`
            pickerElement.style.top = `${y - boundsPicker.height/2}px`
            pickerElement.style.backgroundColor = `rgba(${p[0]},${p[1]},${p[2]},${p[3]})`
        }
    }
    render() {
        return (
            <div className='color-picker'>
                <div className='color-canvas-relative-container'>
                    <div className='color-canvas-background'>
                        <div className='color-canvas-container hidden'>
                            <div ref={this.pickerIndicator} className='color-picker-indicator'></div>
                            <canvas ref={this.colorPickerCanvas} id="colorCanvas"></canvas>
                        </div>
                    </div>
                </div>
                <div className='color-picker-button'>
                    <p className='color-picker-title'>color1</p>
                    <div className='selected-color'></div>
                </div>
            </div>
        )
    }
}

export default ColorPickerComp;