<script lang="jsx">
export default {
  name: 'WebShopSteps',
  props: {
    active: {
      type: Number,
      default: 1
    }
  },
  render() {
    const items = this.$slots.default()
    console.log(items)
    // 渲染bug 有很大相差
    const dynamicItems = []
    items.forEach(item => {
      if (!item.children) {
        dynamicItems.push(item)
      } else {
        item.children.forEach(c => {
          dynamicItems.push(c)
        })
      }
    })
    const itemsJsx = dynamicItems.map((item, i) => {
      return (
        <div class={`xtx-steps-item ${i < this.active ? 'active' : ''}`}>
          <div class="step">
            <span>{i + 1}</span>
          </div>
          <div class="title">{item.props.title}</div>
          <div class="desc">{item.props.desc}</div>
        </div>
      )
    })
    return <div class="xtx-steps">{itemsJsx}</div>
  }
}
</script>

<style lang="scss" scoped>
.xtx-steps {
  display: flex;
  text-align: center;
  &-item {
    flex: 1;
    &:first-child {
      .step {
        &::before {
          display: none;
        }
      }
    }
    &:last-child {
      .step {
        &::after {
          display: none;
        }
      }
    }
    &.active {
      .step {
        > span {
          border-color: $webshopColor;
          background: $webshopColor;
          color: #fff;
        }
        &::before,
        &::after {
          background: $webshopColor;
        }
      }
      .title {
        color: $webshopColor;
      }
    }
    .step {
      position: relative;
      > span {
        width: 48px;
        height: 48px;
        font-size: 28px;
        border: 2px solid #e4e4e4;
        background-color: #fff;
        border-radius: 50%;
        line-height: 44px;
        color: #ccc;
        display: inline-block;
        position: relative;
        z-index: 1;
      }
      &::after,
      &::before {
        content: '';
        position: absolute;
        top: 23px;
        width: 50%;
        height: 2px;
        background: #e4e4e4;
      }
      &::before {
        left: 0;
      }
      &::after {
        right: 0;
      }
    }
    .title {
      color: #999;
      padding-top: 12px;
    }
    .desc {
      font-size: 12px;
      color: #999;
      padding-top: 6px;
    }
  }
}
</style>
