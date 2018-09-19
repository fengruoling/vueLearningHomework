Vue.component('pane', {
    name: 'pane',
    template: '\
        <div class="pane" \
             v-show="show" \
             :style="{ transform: translate }">\
            <slot></slot>\
        </div>',
    props: {
        label: {
            type: String,
            default: '未命名标签'
        },
        name: {
            type: String
        },
        closable: {
            type: Boolean,
            default: false
        }
    },
    data: function () {
        return {
            show: true,
            translate: 'translateX(0)'
        }
    },
    methods: {
        updateNav () {
            this.$parent.updateNav();
        }
    },
    watch: {
        label () {
            this.updateNav();
        }
    },
    mounted () {
        this.updateNav();
    }
});