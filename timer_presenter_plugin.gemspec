lib = File.expand_path("../lib", __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'timer_presenter_plugin/version'

Gem::Specification.new do |spec|
  spec.name          = 'timer_presenter_plugin'
  spec.version       = TimerPresenterPlugin::VERSION
  spec.authors       = ["Derek Graham", "Russell Edens"]
  spec.email         = ["derek@evvnt.com", "russell@voomify.com"]

  spec.summary       = %q{A COPRL presenter plugin for timer}
  spec.homepage      = 'http://github.com/coprl/timer_presenters_plugin'
  spec.license       = 'MIT'

  spec.files         = `git ls-files -z`.split("\x0").reject do |f|
    f.match(%r{^(test|spec|features)/})
  end
  spec.require_paths = ['lib']

  spec.add_development_dependency 'bundler', "~> 2.0"
  spec.add_development_dependency 'rake', "~> 10.0"
end
