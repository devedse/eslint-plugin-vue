/**
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = require('../utils')

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

/**
 * Creates AST event handlers for valid-v-else-if.
 *
 * @param {RuleContext} context - The rule context.
 * @returns {Object} AST event handlers.
 */
function create (context) {
  return utils.defineTemplateBodyVisitor(context, {
    "VAttribute[directive=true][key.name='else-if']" (node) {
      const element = node.parent.parent

      if (!utils.prevElementHasIf(element)) {
        context.report({
          node,
          loc: node.loc,
          message: "'v-else-if' directives require being preceded by the element which has a 'v-if' or 'v-else-if' directive."
        })
      }
      if (utils.hasDirective(element, 'if')) {
        context.report({
          node,
          loc: node.loc,
          message: "'v-else-if' and 'v-if' directives can't exist on the same element."
        })
      }
      if (utils.hasDirective(element, 'else')) {
        context.report({
          node,
          loc: node.loc,
          message: "'v-else-if' and 'v-else' directives can't exist on the same element."
        })
      }
      if (node.key.argument) {
        context.report({
          node,
          loc: node.loc,
          message: "'v-else-if' directives require no argument."
        })
      }
      if (node.key.modifiers.length > 0) {
        context.report({
          node,
          loc: node.loc,
          message: "'v-else-if' directives require no modifier."
        })
      }
      if (!utils.hasAttributeValue(node)) {
        context.report({
          node,
          loc: node.loc,
          message: "'v-else-if' directives require that attribute value."
        })
      }
    }
  })
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  create,
  meta: {
    docs: {
      description: 'enforce valid `v-else-if` directives',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/valid-v-else-if.md'
    },
    fixable: false,
    schema: []
  }
}
