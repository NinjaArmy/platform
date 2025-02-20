import template from './../sw-condition-generic/sw-condition-generic.html.twig';

const { Component, Mixin } = Shopware;
const { getPlaceholderSnippet } = Shopware.Utils.genericRuleCondition;

/**
 * @public
 * @package services-settings
 * @description Condition for generic line item rules. This component must a be child of sw-condition-tree.
 * @status prototype
 * @example-type code-only
 * @component-example
 * <sw-condition-generic-line-item :condition="condition" :level="0"></sw-condition-generic-line-item>
 */
Component.extend('sw-condition-generic-line-item', 'sw-condition-base-line-item', {
    template,
    inheritAttrs: false,

    mixins: [
        Mixin.getByName('generic-condition'),
    ],

    methods: {
        getPlaceholder(fieldType) {
            return this.$tc(getPlaceholderSnippet(fieldType));
        },
    },
});
