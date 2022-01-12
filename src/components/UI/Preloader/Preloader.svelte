<script>
  export let title;
</script>

<div style="position:fixed; top: 84px;right:2%;" class="center-align">
  <div class="preloader-wrapper small active">
    <div class="spinner-layer spinner-blue-only">
      <div class="circle-clipper left">
        <div class="circle" />
      </div>
      <div class="gap-patch">
        <div class="circle" />
      </div>
      <div class="circle-clipper right">
        <div class="circle" />
      </div>
    </div>
  </div>
  <div
    style="padding:0;margin-top:-32px;"
    class="grey-text text-darken-3 center-align">
    {title}
  </div>
</div>
