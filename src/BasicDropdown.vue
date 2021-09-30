<template>
  <div :class="{'dropdown-error': fieldError}" class="dropdown-wrapper">
    <!-- The field title -->
    <div v-if="fieldTitle" class="dropdown-title-box">
      <p class="dropdown-title">{{ fieldTitle }}</p>
    </div>

    <div @click="toggleDropdown()" :id="`dropdown-toggle-${id}`" class="basic-dropdown">

      <!-- The placeholder/selected choice indicator -->
      <div class="dropdown-text-container">
        <!-- <font-awesome-icon icon="caret-up" class="faCaretUp dropdown-icon"/> -->
        <span class="dropdown-text" v-if="!selected">{{ placeholder }}</span>
        <span class="dropdown-selected-text" v-else>{{ selected.name }}</span>
      </div>

      <!-- The dropdown option list -->
      <div v-if="isDropdownShown" :id="`option-list-${id}`" class="option-list">
        <div class="option-list-inner">
          <div v-for="option in dropdownOptions"
               :key="option.id"
               :value="option.id"
               :class="{'selected-option': selected ? option.id == selected.id : false}"
               :id="`option-${option.id}`"
               @click="selectOption(option)"
               class="option">
            {{ option.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BasicDropdown",
  props: {
    dropdownOptions: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    fieldTitle: {
      type: String,
      required: false,
      default: undefined
    },
    selectedOption: {
      required: false
    },
    callback: {
      type: Function,
      required: true
    },
    fieldError: {
      type: Boolean,
      required: false,
      default: false
    },
    id: {
      type: String,
      required: false,
      default: 'default'
    }
  },
  data() {
    return {
      isDropdownShown: false,
      selected: undefined,
    }
  },
  methods: {
    setValues: function() {
      if (this.$props.selectedOption) {
        this.$props.callback(this.selected);
      } else {
        this.selected = this.$props.selectedOption;
      }
    },

    selectOption:function(option) {
      this.selected = option;
      this.$props.callback(option);
    },

    toggleDropdown: function() {
      this.isDropdownShown = !this.isDropdownShown;
      this.isDropdownShown ? document.addEventListener('click', this.clickEvent) : document.removeEventListener('click', this.clickEvent);
    },

    eventContainsElement: function(event, elementId) {
      return document.getElementById(elementId).contains(event.target);
    },

    clickEvent: function () {
      if (!this.eventContainsElement(event, `option-list-${this.$props.id}`) && !this.eventContainsElement(event, `dropdown-toggle-${this.$props.id}`)) {
        this.toggleDropdown();
      }
    }
  },
  watch: {
    selectedOption: function(newVal) {
      if (newVal) {
        this.selected = this.$props.selectedOption
      }
    }
  },
  destroyed() {
    document.removeEventListener('click', this.clickEvent)
  },
  created() {
    this.setValues()
  }
}
</script>

<style scoped lang="scss">

.basic-dropdown {
  background-color: #FFF;
  border: 1px solid #DEDEDE;
  border-radius: 21px;
  box-shadow: inset 0 1px 5px 0 rgba(0, 0, 0, 0.1);
  color: gray;
  font-size: 16px;
  height: 43px;
  position: relative;

  &:hover {
    cursor: pointer;
  }

  .dropdown-text-container {
    align-items: center;
    display: flex;
    height: 100%;
    padding: 0 15px;
  }

  .dropdown-text {
    font-size: 1em;
    opacity: 0.4;
    padding: 0;
  }

  .dropdown-text-error {
    color: red;
    opacity: 1;
  }

  .dropdown-selected-text {
    font-size: 1em;
  }

  .option-list {
    position: relative;
    top: 5px;
    border: 1px solid #DEDEDE;
    border-radius: 15px;
    background-color: #FFFFFF;
    box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.2);
    padding: 8px 0 8px 8px;
    z-index: 20;

    .option-list-inner {
      max-height: 305px;
      overflow-y: auto;
      padding-right: 4px;
      position: relative;

      &::-webkit-scrollbar {
        margin-top: 20px;
      }
    }
  }

  .option {
    background-color: white;
    padding: 16px 15px;

    &:not(:last-of-type) {
      padding-bottom: 15px;
    }
  }

  .option-list .option {
    font-size: 16px;

    &:hover {
      border-radius: 10px;
      background-color: lightgray;
      cursor: pointer;
    }

    &:active {
      color: gray;
    }
  }

  .selected-option {
    border-radius: 10px;
    background-color: lightgray;
  }
}

.dropdown-icon {
  position: absolute;
  right: 17px;
  width: 12px;
}

.dropdown-title {
  color: #676767;
  font-size: 14px;
  line-height: 18px;
  margin: 16px 0 8px 0;
  padding-left: 14px;
}

.dropdown-error {
  .basic-dropdown {
    border: 1px solid red;
  }

  .dropdown-title, .dropdown-text {
    color: red;
  }
}
</style>
