<script lang="jsx">
import { useVModel } from '@vueuse/core'
import { provide } from 'vue'
export default {
  name: 'WebShopTabs',
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const activeName = useVModel(props, 'modelValue', emit)
    //
    provide('activeName', activeName)
    // 点击选项卡对应的处理函数
    const tabClick = (name, index) => {
      activeName.value = name
      emit('tab-click', { name, index })
    }
    return { activeName, tabClick }
  },
  render() {
    const panels = this.$slots.default()
    console.log(panels)
    const dynamicPanels = []
    panels.forEach(item => {
      if (item.type.name === 'WebShopPanels') {
        dynamicPanels.push(item)
      } else {
        item.children.forEach(com => {
          dynamicPanels.push(com)
        })
      }
    })
    // 选项卡
    const nav = (
      <nav>
        {dynamicPanels.map((item, i) => {
          return (
            <a
              onClick={() => this.tabClick(item.props.name, i)}
              class={{ active: item.props.name === this.activeName }}
              href="javascript:;"
            >
              {item.props.label}
            </a>
          )
        })}
      </nav>
    )
    return <div class="xtx-tabs">{[nav, panels]}</div>
  }
}
</script>

<style lang="scss" scoped>
.xtx-tabs {
  background: #fff;
  > nav {
    height: 60px;
    line-height: 60px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    > a {
      width: 110px;
      border-right: 1px solid #f5f5f5;
      text-align: center;
      font-size: 16px;
      &.active {
        border-top: 2px solid $webshopColor;
        height: 60px;
        background: #fff;
        line-height: 56px;
      }
    }
  }
}
</style>
