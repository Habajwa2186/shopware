/**
 * Shopware 5
 * Copyright (c) shopware AG
 *
 * According to our dual licensing model, this program can be used either
 * under the terms of the GNU Affero General Public License, version 3,
 * or under a proprietary license.
 *
 * The texts of the GNU Affero General Public License with an additional
 * permission and of our proprietary license can be found at and
 * in the LICENSE file you have received along with this program.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * "Shopware" is a registered trademark of shopware AG.
 * The licensing of the program under the AGPLv3 does not imply a
 * trademark license. Therefore any rights, title and interest in
 * our trademarks remain entirely with us.
 */

/**
 * Shopware Application
 *
 * @category  Shopware
 * @package   Shopware
 * @copyright Copyright (c) shopware AG (http://www.shopware.de)
 */

//{namespace name=backend/emotion/presets/presets}

//{block name="backend/emotion/presets/list"}

Ext.define('Shopware.apps.Emotion.view.presets.List', {
    alias: 'widget.presets-list',
    region: 'center',
    autoScroll: true,
    extend: 'Ext.panel.Panel',

    initComponent: function () {
        var me = this;

        me.items = [
            me.createInfoView()
        ];

        this.addEvents('emotionpresetselect');

        me.callParent(arguments);
    },

    createInfoView: function () {
        var me = this;

        me.infoView = Ext.create('Ext.view.View', {
            itemSelector: '.thumbnail',
            tpl: me.createTemplate(),
            store: me.store,
            cls: 'theme-listing',
            listeners: {
                render: Ext.bind(me.onAddInfoViewEvents, me)
            }
        });

        return me.infoView;
    },

    createTemplate: function () {
        var me = this;

        return new Ext.XTemplate(
            '{literal}{[this.getPresets(values)]}{/literal}',
            '<div class="x-clear"></div>', {

                getPresets: function (values) {
                    var me = this;

                    if (values.length <= 0) {
                        return '';
                    }

                    return '<div class="preset--outer-container">' +
                            '<div class="x-grid-group-hd x-grid-group-hd-collapsible">' +
                                '<div class="x-grid-group-title">{s name=default_shopping_world_presets}{/s}</div>' +
                            '</div>' +
                            '<div class="preset--container">' +
                                me.getItem(values) +
                                '<div class="x-clear"></div>' +
                            '</div>' +
                        '</div>';
                },

                getItem: function (values) {
                    var items = [];

                    Ext.each(values, function(preset) {
                        var itemTpl = '';

                        if (preset.premium) {
                            itemTpl += '<div class="thumbnail premium">';
                            itemTpl += '<div class="hint premium"><span>{s name=premium_hint}Premium{/s}</span></div>';
                        } else {
                            itemTpl += '<div class="thumbnail">';
                        }

                        itemTpl += '<div class="thumb"><div class="inner-preset-thumb">';

                        if (preset.thumbnail) {
                            itemTpl += Ext.String.format('<img src="[0]" alt="[1]" />', preset.thumbnail, preset.label);
                        } else {
                            itemTpl += Ext.String.format('<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="[0]" />', preset.label);
                        }

                        itemTpl += '<span class="x-editable">' + preset.label + '</span>';
                        itemTpl += '</div></div></div>';

                        items.push(itemTpl);
                    });

                    return items.join('');
                }
            }
        );
    },

    onAddInfoViewEvents: function() {
        var me = this,
            view = me.infoView,
            viewEl = view.getEl();

        viewEl.on({
            'dblclick': {
                scope: me,
                delegate: '.thumbnail',
                fn: Ext.bind(me.selectPreset, me)
            }
        });
    },

    selectPreset: function() {
        var me = this;
        me.fireEvent('emotionpresetselect');
        me.up('emotion-presets-window').close();
    }
});

//{/block}

