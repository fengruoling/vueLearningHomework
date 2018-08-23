Vue.component('InputNumber', {
    template: '\
        <div class="input-number">\
            <input type="text" :value="currentValue"\
                    @change="changeEvent"\
                    @keyup.up="add(1)"\
                    @keyup.down="minus(1)">\
            <button @click="minus(step)"\
                    :disabled="currentValue <= min">-</button>\
            <button @click="add(step)"\
                    :disabled="currentValue >= max">+</button>\
        </div>',
    props: {
        min: {
            type: Number,
            default: -Infinity
        },
        max: {
            type: Number,
            default: Infinity
        },
        step: {
            type: Number,
            default: 1
        },
        value: {
            type: Number,
            default: 0
        }
    },
    data: function () {
        return {
            currentValue: this.value
        }
    },
    watch: {
        value: function (value) {
            this.valueInit(value);
        },
        currentValue: function (value) {
            this.$emit('input', value);
        }
    },
    methods: {
        valueInit: function (value) {
            value = value > this.max ? this.max : value;
            value = value < this.min ? this.min : value;
            this.currentValue = value;
        },
        minus: function (step) {
            this.currentValue = (this.currentValue - step) >= this.min ? (this.currentValue - step) : this.min;
        },
        add: function (step) {
            this.currentValue = (this.currentValue + step) <= this.max ? (this.currentValue + step) : this.max;
        },
        changeEvent: function (event) {
            var str = event.target.value.trim();
            if(isValidNum(str)) {
                this.currentValue = str - 0;
                this.valueInit(this.currentValue);
            } else {
                event.target.value = this.currentValue;
            }
        }
    },
    mounted: function () {
        this.valueInit(this.value);
    }
});

/**
 * @author: FMZ
 * @date: 2018-08-23 15:13:32
 * @description: 校验输入的字符串是否为合理的数值
 * @param {String} str 待校验的字符串 
 * @return {Boolean} 
*/
function isValidNum(str) {
    var reg = /(^-?[1-9]\d*\.\d*[1-9]\d|-?0\.\d*[1-9]\d*$)|(^-?[1-9][0-9]*$)|(^-?0$)/;
    return (reg.test(str + ''));
}