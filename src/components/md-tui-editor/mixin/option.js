import 'codemirror/lib/codemirror.css'; // Editor's Dependency Style
import 'highlight.js/lib/highlight'
import '@toast-ui/editor/dist/toastui-editor.css'; // Editor's Style
/*本来tui提供的@toast-ui/vue-editor组件,但这个库是基于Vue2的。
 *所以我把源码拷过来把写法改成VUE3,否则生命周期就报错了
 *原组件可参考https://github.com/nhn/tui.editor/tree/master/apps/vue-editor
 */
const editorEvents = ['load', 'change', 'stateChange', 'focus', 'blur'];
const defaultValueMap = {
  initialEditType: 'markdown',
  initialValue: '',
  height: '300px',
  previewStyle: 'vertical'
};
export const optionsMixin = {
  emits: editorEvents,
  data() {
    const eventOptions = {};
    editorEvents.forEach(event => {
      eventOptions[event] = (...args) => {
        this.$emit(event, ...args);
      };
    });
    const options = {
      ...this.options,
      initialEditType: this.initialEditType,
      initialValue: this.initialValue,
      height: this.height,
      previewStyle: this.previewStyle,
      events: eventOptions
    };
    Object.keys(defaultValueMap).forEach(key => {
      if (!options[key]) {
        options[key] = defaultValueMap[key];
      }
    });
    return {
      editor: null,
      computedOptions: options
    };
  },
  methods: {
    invoke(methodName, ...args) {
      let result = null;
      if (this.editor[methodName]) {
        result = this.editor[methodName](...args);
      }

      return result;
    }
  },
  unmount() {
    editorEvents.forEach(event => {
      this.editor.off(event);
    });
    this.editor.remove();
  }
};