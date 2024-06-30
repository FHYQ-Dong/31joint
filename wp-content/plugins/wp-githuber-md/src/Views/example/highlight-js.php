<?php 
if ( ! defined('GITHUBER_PLUGIN_NAME') ) die; 
/**
 * View for Controller/Setting
 *
 * @author Terry Lin
 * @link https://terryl.in/
 *
 * @package Githuber
 * @since 1.2.0
 * @version 1.3.0
 */
?>
<p style="color: #aa0000"><?php echo __( 'If you switch to another highlighter moudle, you have to update every your post to take effect.<br />Because only the language files defined in the code block will be loaded, not all fat packed file.', 'wp-githuber-md' ); ?> </p>
<pre class="prettyprint setting-example">
<code class="language-markdown">
```php
function sayHello() {
	return &#39;Hello! World.&#39;;
}

echo sayHello();
```
</code>
</pre>
<p class="description"><?php echo __( 'Block identification code:', 'wp-githuber-md' ); ?> 
<a href="https://terryl.in/en/highlight-js-html-code-language-list-for-syntax-highlighting/" target="_blank">
<?php echo __( 'Check out this page to view the full list.', 'wp-githuber-md' ); ?></a>
</p>



