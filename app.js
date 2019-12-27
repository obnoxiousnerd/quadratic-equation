const app = new Vue({
    el : '.app',
    data : {
        a : +1,
        b : +1,
        c : +1,
        output : []  
    },
    methods: {
        outputInit(){
            this.output = []
        },
        findAnswer(x,y,z){
            let a = parseInt(x)
            let b = parseInt(y)
            let c = parseInt(z)
            let discriminant = Math.sqrt(Math.pow(b, 2) - (4 * a * c))
            if(discriminant < 0){
                this.pushOutput("Imaginary","Imaginary")
            }
            else{
                let x1 = ((-1 * b) + discriminant) / (2 * a);
                let x2 = ((-1 * b) - discriminant) / (2 * a);
                //these redefinitions are added to round up a integer or leave
                //it if in decimals
                x1 = x1 % 1 != 0 ? x1.toFixed(4) : x1
                x2 = x2 % 1 != 0 ? x2.toFixed(4) : x2
                if(x1 === NaN && x2 === NaN || x1 === 'NaN' && x2 === 'NaN'){
                //The second condition in the OR above was necessary because sometimes the NaN is pushed as a string like "NaN"
                    this.pushOutput("Imaginary","Imaginary")
                }
                else{
                this.pushOutput(x1,x2)
                this.draw()
                }
            }
        },
        pushOutput(x1,x2){
            this.outputInit()
            this.output.push(x1)
            this.output.push(x2)
        },
        draw() {
            try {
              // compile the expression once
              const expression = this.a + "* x * x+" + this.b + "x+" + this.c
              const expr = math.compile(expression)
              console.log("TCL: draw -> expr", expr)
              // evaluate the expression repeatedly for different values of x
              const xValues = math.range(-10, 10, 0.5).toArray()
              const yValues = xValues.map(function (x) {
                return expr.evaluate({x: x})
              })
        
              // render the plot using plotly
              const trace1 = {
                x: xValues,
                y: yValues,
                type: 'scatter'
              }
              const data = [trace1]
              Plotly.newPlot('plot', data)
            }
            catch (err) {
              console.error(err)
              alert(err)
            }
          }
    },
    template : `
    <div>
        <h1 style="text-align:center">The Quadratic Equation Solver</h1>
        <div id="equation">
            <input type="text" class="a" v-model="a" placeholder="+A">x<sup>2</sup>
            <input type="text" class="b" v-model="b" placeholder="+B">x
            <input type="text" class="c" v-model="c" placeholder="+C" v-on:keyup="findAnswer(a,b,c)"> = 0
        </div>
        <div id="submit">
            <button class="check" v-on:click="findAnswer(a,b,c)">check</button>
            <h1 v-if="output.length !== 0">x = {{output[0]}} and {{output[1]}}</h1>
            <h1 v-else></h1>
            <div id="plot"></div>
        </div>
    </div>
    `
})