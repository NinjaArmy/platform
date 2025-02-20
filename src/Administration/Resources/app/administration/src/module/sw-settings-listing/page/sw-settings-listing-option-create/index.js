/**
 * @package inventory
 */
import '../sw-settings-listing-option-base';
import template from './sw-settings-listing-option-create.html.twig';

const { Criteria } = Shopware.Data;
// eslint-disable-next-line sw-deprecation-rules/private-feature-declarations
export default {
    template,

    compatConfig: Shopware.compatConfig,

    computed: {
        smartBarHeading() {
            return this.productSortingEntity && this.productSortingEntity.label ?
                this.productSortingEntity.label :
                this.$tc('sw-settings-listing.create.smartBarTitle');
        },

        isNewProductSorting() {
            return !this.productSortingEntity || this.productSortingEntity._isNew;
        },

        urlKeyCriteria() {
            const criteria = new Criteria(1, 1);
            criteria.addFilter(Criteria.equals('key', this.productSortingEntity.key));
            return criteria;
        },
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.fetchCustomFields().then(() => {
                this.productSortingEntity = this.createProductSortingEntity();
                Shopware.State.commit('context/resetLanguageToDefault');
            });
        },

        createProductSortingEntity() {
            const productSortingEntity = this.productSortingRepository.create();
            productSortingEntity.fields = [];
            productSortingEntity.priority = 1;
            productSortingEntity.active = false;

            return productSortingEntity;
        },

        async onSave() {
            this.sortingOptionTechnicalNameError = null;
            this.sortingOptionLabelError = null;

            this.transformCustomFieldCriterias();

            this.productSortingEntity.fields = this.productSortingEntity.fields.filter(field => {
                return field.field !== 'customField';
            });

            return this.saveProductSorting()
                .then(response => {
                    const encodedResponse = JSON.parse(response.config.data);

                    this.$router.push({ name: 'sw.settings.listing.edit', params: { id: encodedResponse.id } });

                    const sortingOptionName = this.productSortingEntity.label;

                    this.createNotificationSuccess({
                        message: this.$t('sw-settings-listing.base.notification.saveSuccess', { sortingOptionName }),
                    });
                })
                .catch(() => {
                    const sortingOptionName = this.productSortingEntity.label;

                    this.createNotificationError({
                        message: this.$t('sw-settings-listing.base.notification.saveError', { sortingOptionName }),
                    });
                });
        },

        onAddCriteria(fieldName) {
            if (!fieldName) {
                return;
            }

            const newCriteria = this.getCriteriaTemplate(fieldName);

            if (!this.productSortingEntity.fields) {
                this.productSortingEntity.fields = [];
            }

            this.productSortingEntity.fields.push(newCriteria);
        },

        onConfirmDeleteCriteria() {
            // filter out criteria
            this.productSortingEntity.fields = this.productSortingEntity.fields.filter(currentCriteria => {
                return currentCriteria.field !== this.toBeDeletedCriteria.field;
            });

            // close delete modal
            this.toBeDeletedCriteria = null;
        },
    },
};
