export default class Paddle{
    constructor(paddleElem){
        this.paddleElem = paddleElem
    }
    get position(){
        return parseFloat(window.getComputedStyle(this.paddleElem).getPropertyValue('--position'))
    }
    set position(value){
        this.paddleElem.style.setProperty('--position' , value)
    }
    rect(){
        return this.paddleElem.getBoundingClientRect()
    }
    reset(){
        this.position = 50
    }
    update(delta , ballPosition){
        this.position += 0.013 * delta *(ballPosition - this.position)
    }
}