require 'voom/presenters/dsl/components/event_base'

module Voom
  module Presenters
    module Plugins
      module Timer
        module Components
          class CountDownTimer < DSL::Components::EventBase
            attr_reader :redirect_url, :redirect_params, :delete_url, :delete_params, :expired_message

            def initialize(end_time, **attribs, &block)
              @end_time = end_time
              @redirect_url = attribs.delete(:redirect_url) { nil }
              @redirect_params = attribs.delete(:redirect_params) { {} }
              @delete_url = attribs.delete(:delete_url) { nil }
              @delete_params = attribs.delete(:delete_params) { {} }
              @expired_message = attribs.delete(:expired_message) { 'EXPIRED' }
              super(type: :count_down_timer, **attribs, &block)
              expand!
            end

            def end_time
              @end_time.strftime("%Y-%m-%dT%k:%M:%S%:z")
            end
          end
        end
      end
    end
  end
end
