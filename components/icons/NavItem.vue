<template>
  <svg
    class="icon nav-item"
    :class="`nav-item--${type} ${classes}`"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
  >
    <g v-if="type === 'question'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.3334 2.66667H8.00004c-.70724 0-1.38552.28095-1.88562.78105-.50009.5001-.78105 1.17837-.78105 1.88562V26.6667c0 .7072.28096 1.3855.78105 1.8856.5001.5001 1.17838.781 1.88562.781H24c.7073 0 1.3856-.2809 1.8857-.781s.781-1.1784.781-1.8856V10l-7.3333-7.33333Z"/>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.3334 13.7333C13.6 13.2 14 12.6667 14.5334 12.4c.5521-.3192 1.1968-.4404 1.8272-.3434.6304.097 1.2088.4063 1.6394.8767.4.5334.6667 1.0667.6667 1.7334C18.6667 16.4 16 17.3333 16 17.3333m0 5.3334h.0134"/>
    </g>
    <g v-else-if="type === 'code'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.33325 29.3333H23.9999c.7073 0 1.3855-.2809 1.8856-.781s.7811-1.1784.7811-1.8856V9.99999l-7.3334-7.33333H7.99992c-.70725 0-1.38552.28095-1.88562.78105-.5001.50009-.78105 1.17837-.78105 1.88561v5.33338"/>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.6666 2.66666v8.00004h8M12 24l4-4-4-4m-5.33337 0-4 4 4 4"/>
    </g>
    <g v-else-if="type === 'grad'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M29.3333 13.3333v8m0-8L16 6.66666 2.66663 13.3333 16 20l13.3333-6.6667Z"/>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16v6.6667c4 4 12 4 16 0V16"/>
    </g>
    <path v-else-if="type === 'clip'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M28.5867 14.7333 16.3334 26.9867c-1.5011 1.5011-3.5371 2.3444-5.66 2.3444-2.12292 0-4.15888-.8433-5.66001-2.3444-1.50112-1.5011-2.34444-3.5371-2.34444-5.66s.84332-4.1589 2.34444-5.66L16.4401 4.24001c1.0007-1.00251 2.3587-1.56642 3.7752-1.56768 1.4166-.00125 2.7756.56027 3.7781 1.56102s1.5664 2.35876 1.5677 3.77528c.0012 1.41653-.5603 2.77557-1.561 3.77807L12.5467 23.2133c-.5003.5004-1.179.7815-1.8866.7815-.70768 0-1.38633-.2811-1.88671-.7815-.50037-.5003-.78148-1.179-.78148-1.8866 0-.7077.28111-1.3863.78148-1.8867L20.0934 8.13335"/>
    <path v-else-if="type === 'li'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21.3334 10.6655c2.1217 0 4.1566.8429 5.6569 2.3432 1.5003 1.5003 2.3431 3.5351 2.3431 5.6568v9.3334h-5.3333v-9.3334c0-.7072-.281-1.3855-.7811-1.8856s-1.1783-.781-1.8856-.781c-.7072 0-1.3855.2809-1.8856.781s-.7811 1.1784-.7811 1.8856v9.3334h-5.3333v-9.3334c0-2.1217.8429-4.1565 2.3432-5.6568 1.5003-1.5003 3.5351-2.3432 5.6568-2.3432ZM2.66675 11.9989h5.33333v16H2.66675v-16ZM5.33341 7.99886c1.47276 0 2.66667-1.19391 2.66667-2.66667 0-1.47276-1.19391-2.66666-2.66667-2.66666-1.47275 0-2.66666 1.1939-2.66666 2.66666 0 1.47276 1.19391 2.66667 2.66666 2.66667Z"/>
    <g v-else-if="type === 'gh'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.0001 29.3322v-5.3333c.1855-1.6703-.2934-3.3465-1.3333-4.6667 4 0 8-2.6667 8-7.3333.1067-1.6667-.36-3.30671-1.3333-4.66671.3733-1.53333.3733-3.13333 0-4.66666 0 0-1.3334 0-4 2-3.52-.66667-7.1467-.66667-10.6667 0-2.66667-2-4-2-4-2-.4 1.53333-.4 3.13333 0 4.66666-.97084 1.35452-1.44204 3.00371-1.33334 4.66671 0 4.6666 4 7.3333 8.00004 7.3333-.52.6533-.9067 1.4-1.1334 2.2-.2266.8-.2933 1.64-.2 2.4667v5.3333"/>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.0001 23.9987c-6.01335 2.6667-6.66669-2.6667-9.33335-2.6667"/>
    </g>
    <g v-else-if="type === 'email'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.0001 21.3322c2.9455 0 5.3333-2.3878 5.3333-5.3333 0-2.9456-2.3878-5.3334-5.3333-5.3334-2.9455 0-5.3334 2.3878-5.3334 5.3334 0 2.9455 2.3879 5.3333 5.3334 5.3333Z"/>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21.3334 10.6657v6.6666c0 1.0609.4215 2.0783 1.1716 2.8285.7501.7501 1.7676 1.1715 2.8284 1.1715 1.0609 0 2.0783-.4214 2.8285-1.1715.7501-.7502 1.1715-1.7676 1.1715-2.8285V15.999c-.0002-3.0093-1.0183-5.93-2.8889-8.28728-1.8706-2.35726-4.4837-4.01241-7.4142-4.69631-2.9306-.68391-6.0063-.35634-8.7271.92942C7.58244 5.2306 5.37662 7.39895 4.04444 10.0973c-1.33219 2.6984-1.71239 5.768-1.07879 8.7099.6336 2.9418 2.24375 5.5828 4.56862 7.4935 2.32487 1.9107 5.22773 2.9788 8.23663 3.0305 3.0088.0518 5.9467-.9159 8.3359-2.7455"/>
    </g>
    <g v-else-if="type === 'cp'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15.9998 29.3334 13.3334-8.6667v-9.3333L15.9998 2.66675 2.6665 11.3334v9.3333l13.3333 8.6667Zm0 0v-8.6667"/>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m29.3332 11.3335-13.3334 9.3333-13.3333-9.3333M2.6665 20.6667l13.3333-9.3333m0 0 13.3334 9.3333m-13.3334-9.3333V2.66675"/>
    </g>
    <g v-else-if="type === 'text'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.3335 2.66669H8.00016c-.70724 0-1.38552.28095-1.88562.78105-.50009.50009-.78104 1.17837-.78104 1.88561V26.6667c0 .7072.28095 1.3855.78104 1.8856.5001.5001 1.17838.7811 1.88562.7811H24.0002c.7072 0 1.3855-.281 1.8856-.7811s.781-1.1784.781-1.8856V10l-7.3333-7.33331Z"/>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.667 2.66669v8.00001h8m-5.3333 6.6667H10.667m10.6667 5.3333H10.667M13.3337 12H10.667"/>
    </g>
  </svg>
</template>

<script lang="ts">
  const props = {
    classes: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'question',
    },
  };

  export default {
    name: 'NavItem',
    props,
  };
</script>

<style lang="scss">
  .nav-item {
    width: 2rem;
    height: 2rem;
    fill: none;
    stroke: currentColor;
  }
</style>