��    J      l  e   �      P     Q  0   Z     �  \   �  A     Y   J  J   �     �     	     !  �  .     �	  �   �	     U
     r
     �
  \  �
  
   �  "         #  d   )     �     �  )   �  ;   �  .     5   A  D   w  +   �  p   �  /   Y     �     �     �     �  ?   �  -     $   2  K   W  �   �  7   �  �   �  G   T  @   �  R   �  C   0  p   t  Q   �     7  h   W  6   �  �   �     �    �  �   �  0   x  J   �  1   �  9  &  <   `  M   �  O   �  /   ;  ,   k  &   �  +   �     �     �  :     /   H     x     �     �  ,  �     �  ,   �        S   -  A   �  Y   �  I        g     �     �  I  �  	   �  �   �     �  $   �     �  @  �     !     *!     H!  W   O!     �!     �!  $   �!  5   �!  '   "  *   G"  8   r"  ,   �"  Z   �"  !   3#     U#     l#     #     �#  6   �#  )   �#      �#  J   $  �   i$  9   %  u   R%  !   �%  @   �%  9   +&  3   e&  f   �&  9    '     :'  h   S'  0   �'  �   �'     �(  �   �(  y   �)  $   1*  <   V*  *   �*  �   �*  ?   �+  E   �+  <   6,     s,     �,     �,     �,     �,     �,  :   �,  *   /-     Z-     i-     u-     D         ?      #   %      /           '   F   +                              9   J   1          8   
           (   >   *   	             5           =   C         ,      -                            2       &   0      6   E   G   I   ;                3   B   $       :   <      !      H      7   "                   4              .       A   @                     )    %s (old) <code>{filename}</code> {width}×{height} pixels <strong>ERROR:</strong> {error} <strong>{label}:</strong> {width}×{height} pixels (thumbnail would be larger than original) <strong>{label}:</strong> {width}×{height} pixels ({cropMethod}) <strong>{label}:</strong> {width}×{height} pixels ({cropMethod}) <code>{filename}</code> <strong>{label}:</strong> {width}×{height} pixels <code>{filename}</code> Alex Mills (Viper007Bond) All done in {duration}. Alternatives Another alternative is to use the <a href="{url-photon}">Photon</a> functionality that comes with the <a href="{url-jetpack}">Jetpack</a> plugin. It generates thumbnails on-demand using WordPress.com's infrastructure. <em>Disclaimer: The author of this plugin, Regenerate Thumbnails, is an employee of the company behind WordPress.com and Jetpack but I would recommend it even if I wasn't.</em> Attachment %d Delete thumbnail files for old unregistered sizes in order to free up server space. This may result in broken images in your posts and pages. Done! Click here to go back. Error Regenerating Errors Encountered If you have <a href="{url-cli}">command-line</a> access to your site's server, consider using <a href="{url-wpcli}">WP-CLI</a> instead of this tool. It has a built-in <a href="{url-wpcli-regenerate}">regenerate command</a> that works similarly to this tool but should be significantly faster since it has the advantage of being a command-line tool. Loading… No attachment exists with that ID. Pause Posts to process per loop. This is to control memory usage and you likely don't need to adjust this. Preview Regenerate Thumbnails Regenerate Thumbnails For All Attachments Regenerate Thumbnails For All {attachmentCount} Attachments Regenerate Thumbnails For Featured Images Only Regenerate Thumbnails For The %d Selected Attachments Regenerate Thumbnails For The {attachmentCount} Featured Images Only Regenerate Thumbnails: {name} — WordPress Regenerate the thumbnails for one or more of your image uploads. Useful when changing their sizes or your theme. Regenerate the thumbnails for this single image Regenerated {name} Regenerating… Regeneration Log Resume Skip regenerating existing correctly sized thumbnails (faster). Skipped Attachment ID {id} ({name}): {reason} Skipped Attachment ID {id}: {reason} Specific post IDs to update rather than any posts that use this attachment. The attachment says it also has these thumbnail sizes but they are no longer in use by WordPress. You can probably safely have this plugin delete them, especially if you have this plugin update any posts that make use of this attachment. The current image editor cannot process this file type. The fullsize image file cannot be found in your uploads directory at <code>%s</code>. Without it, new thumbnail images can't be generated. The page number requested is larger than the number of pages available. The types of posts to update. Defaults to all public post types. There was an error regenerating this attachment. The error was: <em>{message}</em> These are all of the thumbnail sizes that are currently registered: These are the currently registered thumbnail sizes, whether they exist for this attachment, and their filenames: This attachment is a site icon and therefore the thumbnails shouldn't be touched. This item is not an attachment. This plugin requires WordPress 4.7 or newer. You are on version %1$s. Please <a href="%2$s">upgrade</a>. This tool requires that JavaScript be enabled to work. This tool won't be able to do anything because your server doesn't support image editing which means that WordPress can't create thumbnail images. Please ask your host to install the Imagick or GD PHP extensions. Thumbnail Sizes To process a specific image, visit your media library and click the &quot;Regenerate Thumbnails&quot; link or button. To process multiple specific images, make sure you're in the <a href="%s">list view</a> and then use the Bulk Actions dropdown after selecting one or more images. Unable to fetch a list of attachment IDs to process from the WordPress REST API. You can check your browser's console for details. Unable to load the metadata for this attachment. Update the content of posts that use this attachment to use the new sizes. Update the content of posts to use the new sizes. When you change WordPress themes or change the sizes of your thumbnails at <a href="%s">Settings → Media</a>, images that you have previously uploaded to you media library will be missing thumbnail files for those new image sizes. This tool will allow you to create those missing thumbnail files for all images. Whether to delete any old, now unregistered thumbnail files. Whether to only regenerate missing thumbnails. It's faster with this enabled. Whether to update the image tags in any posts that make use of this attachment. action for a single imageRegenerate Thumbnails admin menu entry titleRegenerate Thumbnails admin page titleRegenerate Thumbnails bulk actions dropdownRegenerate Thumbnails cropped to fit https://alex.blog/ https://alex.blog/wordpress-plugins/regenerate-thumbnails/ proportionally resized to fit inside dimensions {count} hours {count} minutes {count} seconds PO-Revision-Date: 2021-03-19 17:52:29+0000
MIME-Version: 1.0
Content-Type: text/plain; charset=UTF-8
Content-Transfer-Encoding: 8bit
Plural-Forms: nplurals=1; plural=0;
X-Generator: GlotPress/4.0.0-alpha.7
Language: zh_CN
Project-Id-Version: Plugins - Regenerate Thumbnails - Stable (latest release)
 %s（旧） <code>{filename}</code> {width}×{height} px <strong>错误:</strong> {error} <strong>{label}:</strong> {width}×{height} 像素 (缩略图会比原始图片大) <strong>{label}:</strong> {width}×{height} 像素 ({cropMethod}) <strong>{label}:</strong> {width}×{height} 像素 ({cropMethod}) <code>{filename}</code> <strong>{label}:</strong> {width}×{height} 像素<code>{filename}</code> Alex Mills (Viper007Bond) 在 {duration} 内完成。 备择方案 另一种选择是使用<a href="{url-jetpack}">Jetpack</a>插件包含的<a href="{url-photon}">Photon</a>功能。它使用WordPress.com的基础架构按需生成缩略图。<em>免责声明：该插件的作者Regenerate Thumbnails是WordPress.com和Jetpack背后公司的雇员，但即使不是我也推荐这样做。</em> 附件 %d 删除旧的未注册尺寸的缩略图文件，以释放服务器空间。 此选项可能会导致文章和页面中的图像损坏。 搞定！ 点击这里返回。 重新生成缩略图时发生错误 出现错误 如果您有<a href="{url-cli}">命令行</a>访问您网站的服务器，请考虑使用<a href="{url-wpcli}"> WP-CLI </a>这个工具。它具有内置的<a href="{url-wpcli-regenerate}">重新生成命令</a>，其工作方式与此工具类似，但应该快得多，因为它具有作为命令行工具的优势。 正在加载… 该ID不存在任何附件。 暂停 每次处理的文章数量，此选项控制内存使用量，一般不需要调整。 预览 重新生成缩略图 重新生成所有附件的缩略图 为所有{attachmentCount}附件重新生成缩略图 仅为特色图片重新生成缩略图 重新生成 %d个选定附件的缩略图 仅为{attachmentCount}精选图片重新生成缩略图 Regenerate Thumbnails：{name} — WordPress 重新生成一个或多个图片上传的缩略图。更改尺寸或主题时很有用。 为此图像重新生成缩略图 已重新生成 {name} 重新生成中... 生成缩略图日志 恢复 不再重新生成已存在的缩略图（更快）。 已跳过附件ID {id} ({name}): {reason} 已跳过附件ID {id}: {reason} 需要更新的具体文章ID，而不是所有使用此附件的文章。 附件包含WordPress已不再适用的缩略图尺寸文档。你可以让此插件安全的删除他们，尤其是使用此插件更新所有包含此插件的文章时。 当前的图像编辑器无法处理这种文件类型。 在<code>%s</code>的上传目录中找不到完整的图片文件。没有它，不能生成新的缩略图图像。 请求的页数大于总页数。 要更新的文章类型。 默认为所有公开文章类型。 重新生成缩略图时出现错误：<em>{message}</em> 这些都是当前注册的所有缩略图尺寸： 这些是当前注册的缩略图大小，某附件是否存在此尺寸以及其文件名的信息： 此附件是站点图标，因此不应触摸缩略图。 此项目不是附件。 这个插件需要 WordPress 4.7 或更新版本。您位于版本%1$s。请<a href="%2$s">升级</a>。 该工具要求启用 JavaScript 才能工作。 此工具无法执行任何操作，因为您的服务器不支持图片编辑，这意味着 WordPress 无法创建缩略图图片。请要求您的主机安装 Imagick 或 GD PHP 扩展。 缩略图大小 要处理特定图像，请访问媒体库并单击“重新生成缩略图” 链接或按钮。 要处理多个特定图像，请确保您在<a href="%s">列表视图</a>中，然后在选择一个或多个图像后使用批量操作下拉列表。 无法获取要从 WordPress REST API 处理的附件ID列表。您可以查看浏览器的控制台了解详细信息。 无法加载此附件的元数据。 更新使用此附件的帖子的内容以使用新尺寸。 更新文章的内容以使用新尺寸。 当您更换主题或在<a href="%s">设置 → 媒体</a>中更改缩略图的大小时，之前上传到媒体库的图像将缺少这些新尺寸的缩略图文件。此工具将可以让您为所有图像创建缺少的缩略图文件。 是否删除任何旧的，现在未注册的缩略图文件。 是否仅重新生成缺失的缩略图。启用此功能会更快。 是否更新任何使用此附件的文章中的img标签。 重新生成缩略图 重新生成缩略图 重新生成缩略图 重新生成缩略图 裁剪到适合大小 https://alex.blog/ https://alex.blog/wordpress-plugins/regenerate-thumbnails/ 按比例调整大小以适应图像尺寸 {count} 小时 {count} 分 {count} 秒 