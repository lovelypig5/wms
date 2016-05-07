const dict = {
    goodsMenu: ['text_goods_state', 'text_goods_list', 'text_goods_out', 'text_goods_in', 'text_goods_outlist', 'text_goods_inlist', 'text_goods_create'],
    orderMenu: ['text_order_list', 'text_order_create'],
    select2: {
        "zh": {
            errorLoading: function() {
                return '无法载入结果。';
            },
            inputTooLong: function(args) {
                var overChars = args.input.length - args.maximum;

                var message = '请删除' + overChars + '个字符';

                return message;
            },
            inputTooShort: function(args) {
                var remainingChars = args.minimum - args.input.length;

                var message = '请再输入至少' + remainingChars + '个字符';

                return message;
            },
            loadingMore: function() {
                return '载入更多结果…';
            },
            maximumSelected: function(args) {
                var message = '最多只能选择' + args.maximum + '个项目';

                return message;
            },
            noResults: function() {
                return '未找到结果';
            },
            searching: function() {
                return '搜索中…';
            }
        }
    }
}

export default dict;