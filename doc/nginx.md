```
#on为启用，off为关闭
gzip on;

#设置允许压缩的页面最小字节数，页面字节数从header头中的Content-Length中进行获取。默认值是0，不管页面多大都压缩。建议设置成大于1k的字节数，小于1k可能会越压越大。
gzip_min_length 1k;

#获取多少内存用于缓存压缩结果，'4 16k'表示以 16k*4为单位获得
gzip_buffers 4 16k;

#gzip压缩比（1~9），越小压缩效果越差，但是越大处理越慢，所以一般取中间值
gzip_comp_level 5;

#对特定的MIME类型生效,其中 'text/html' 被系统强制启用
gzip_types text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php;
```