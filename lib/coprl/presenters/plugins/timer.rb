require_relative 'timer/components/count_down_timer'

module Coprl
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

          def view_dir_timer(pom)
            File.join(__dir__, '../../../..', 'views', 'components')
          end

          def render_header_timer(pom, render:)
            render.call :erb, :timer_header, views: view_dir_timer(pom)
          end

          def render_count_down_timer(comp,
                                      render:,
                                      components:,
                                      index:)
            render.call :erb, :timer, views: view_dir_timer(comp),
                        locals: {comp: comp,
                                 components: components,
                                 index: index}
          end

        end

      end
    end
  end
end
