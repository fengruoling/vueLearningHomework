Vue.component('tab', {
    template: '\
        <div class="tabs">\
            <div class="tabs-bar">\
                <div \
                    :class="tabCls(item)"\
                    v-for="(item, index) in navList"\
                    @click="handleChange(index)"> \
                    {{item.label}}\
                    <span \
                        class="icon-close"\
                        v-if="item.closable"\
                        @click="handleClose(index)">X</span>\
                </div>\
            </div>\
            <div class="tabs-content">\
                <slot></slot>\
            </div>\
        </div>',
    props: {
        value: {
            type: [String, Number]
        }
    },
    data: function () {
        return {
            currentValue: this.value,
            navList: []
        }
    },
    methods: {
        tabCls: function (item) {
            return [
                'tabs-tab',
                {
                    'tabs-tab-active': item.name === this.currentValue,
                    'tabs-tab-closable': item.closable
                }
            ]
        },
        getTabs () {
            return this.$children.filter(function (item) {
                return item.$options.name === 'pane';
            });
        },
        updateNav () {
            this.navList = [];
            var _this = this;
            this.getTabs().forEach(function (pane, index) {
                _this.navList.push({
                    label: pane.label,
                    name: pane.name || index,
                    closable: pane.closable
                });
                if(!pane.name) {
                    pane.name = index;
                }
                if(index === 0 && !_this.currentValue) {
                    _this.currentValue = pane.name || index;
                }
            });

            this.updateStatus();
        },
        updateStatus () {
            var _this = this;
            // this.getTabs().forEach(function (tab) {
            //     tab.show = tab.name === _this.currentValue;
            // });
            var tabs = this.getTabs();
            var num = 0;
            try {
                tabs.forEach(function (tab) {
                    if(tab.show === true && tab.name === _this.currentValue) {
                        throw 'Jump out now!'
                    } else {
                        num += 1;
                    }
                });
            } catch {
                tabs.forEach(function (tab) {
                    tab.translate = 'translateX(-' + num * 100 + '%)';
                });
            }
            
        },
        handleChange: function (index) {
            var nav = this.navList[index];
            if(typeof nav === "undefined") {
                nav = this.navList[this.navList.length - 1];
            }
            var name = nav.name;
            this.currentValue = name;
            this.$emit('input', name);
            this.$emit('on-click', name);
        },
        handleClose: function (index) {
            this.navList.splice(index, 1);
            this.getTabs()[index].show = false;
        }
    },
    watch: {
        value: function (val) {
            this.currentValue = val;
        },
        currentValue: function () {
            this.updateStatus();
        }
    }
});