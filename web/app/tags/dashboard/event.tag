<event class='event event--{opts.e.type} event--{opts.e.lift} event__isGenerated--{!!opts.e.isGenerated}'>
<style>
    .event {
      display: block;
      margin-bottom: 2px;
      font-size: 8px;
      font-weight: bold;
      color: white;
      padding-left: 2px;
      padding-right: 2px;
      border-radius: 8px;
      text-align: center;
    }

    .event--log {
      background: blue;
        
    }

    .event--press::before { content: "P" }
    .event--squat::before { content: "S" }
    .event--bench::before { content: "B" }
    .event--deadlift::before { content: "D" }

    .event--log.event__isGenerated--true {
      opacity: 0.4;
    }

    .event--max {
      background: red;
    }
    .event--max::before { content: "▲" }
    .event--max-reset::before { content: "▼" }
</style>
</event>
