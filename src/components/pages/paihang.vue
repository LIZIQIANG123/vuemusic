<template>
    <div>
            <x-header :left-options="{backText: '排行榜'}"></x-header>
            <group label-width="4.5em" label-margin-right="2em" label-align="right" title="LOOK直播排行榜">
                <flexbox>
      <flexbox-item><img src="123"/></flexbox-item>
      <flexbox-item><div class="flex-demo">2</div></flexbox-item>
    </flexbox>
            </group>
    </div>
</template>
<script>
import { XHeader, Group,Cell, Flexbox, FlexboxItem} from 'vux'
export default {
    components: {
    XHeader,
   Group
   ,Cell,
    Flexbox, FlexboxItem
  },
}
</script>
<style scoped>

</style>
