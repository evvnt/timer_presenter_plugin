require 'voom/presenters/dsl/components/event_base'

module Voom
  module Presenters
    module Plugins
      module Timer
        module Components
          class CountDownTimer < DSL::Components::EventBase
            attr_reader :end_time, :schedule, :expired_message

            def initialize(end_time, **attribs, &block)
              @end_time = end_time
              @schedule = attribs.delete(:schedule) { {} }
              @expired_message = attribs.delete(:expired_message) { 'EXPIRED' }
              super(type: :count_down_timer, **attribs, &block)
              expand!
            end
          end
        end
      end
    end
  end
end
