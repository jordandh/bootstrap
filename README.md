bootstrap
=========

Additions and modifications to Bootstrap 3.

# popover-group
A popover-group allows you to write the popover content in your markup alongside the ```css [data-toggle="popover"]``` element.

```html
<div class="popover-group">
	<button class="btn btn-primary" data-toggle="popover" data-placement="bottom">
		Notes
		<i class="icon-caret-down"></i>
	</button>
	<div class="popover" data-touch-toggle-ignore>
		<div class="arrow"></div>
		<h3 class="popover-static-title"><strong>Notes</strong></h3>
		<div class="popover-static-content">
			<ul class="list-unstyled">
				<li>
		    		Note 1: This is my first attempt.
		    	</li>
		    	<li>
		    		Note 2: I made a few edits.
		    	</li>
			</ul>
		</div>
	</div>
</div>
```

No javascript is required to have the popover open when clicking the ```css .popover-group [data-toggle="popover"]``` button. A popover will be shown using the ```css .popover-group .popover```.