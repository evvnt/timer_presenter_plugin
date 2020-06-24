require_relative 'timer/components/count_down_timer'

module Voom
  module Presenters
    module Plugins
      module Timer

        module DSLComponents
          def count_down_timer(end_time, **attributes, &block)
            self << Timer::Components::CountDownTimer.new(end_time,
                                                           parent: self, **attributes, &block)
          end
        end

        module WebClientComponents
          VIEW_DIR = File.join(__dir__, 'timer/views')

          def render_header_timer(_pom, render:)
            render.call :erb, :header, views: VIEW_DIR
          end

          def render_count_down_timer(comp,
                                      render:,
                                      components:,
                                      index:)
            render.call :erb, :timer, views: VIEW_DIR,
                        locals: {comp: comp,
                                 components: components,
                                 index: index}
          end

        end

      end
    end
  end
end
