import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { StrategyTemplate, strategyTemplates } from './strategy-templates';

@Component({
    selector: 'app-strategy-form',
    templateUrl: './strategy-form.component.html',
    standalone: false
})
export class StrategyFormComponent implements OnInit {
    strategyForm: FormGroup;
    isEditMode = false;
    strategyId: string | null = null;
    loading = false;
    error = '';

    // Import templates from external file
    templates = strategyTemplates;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        private authService: AuthService
    ) {
        this.strategyForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            description: [''],
            templateId: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.strategyId = this.route.snapshot.paramMap.get('id');
        this.isEditMode = !!this.strategyId;

        if (this.isEditMode && this.strategyId) {
            this.loadStrategy(this.strategyId);
        }
    }

    private loadStrategy(id: string) {
        this.loading = true;
        this.http.get<any>(`http://localhost:3000/strategies/${id}`)
            .subscribe({
                next: (strategy) => {
                    this.strategyForm.patchValue({
                        name: strategy.name,
                        description: strategy.description,
                        templateId: this.findTemplateByCode(strategy.code)?.id || ''
                    });
                    this.loading = false;
                },
                error: (error) => {
                    this.error = 'Failed to load strategy';
                    this.loading = false;
                    console.error('Error loading strategy:', error);
                }
            });
    }

    private findTemplateByCode(code: string): StrategyTemplate | undefined {
        return this.templates.find(template => template.code.trim() === code.trim());
    }

    getSelectedTemplate(): StrategyTemplate | undefined {
        const templateId = this.strategyForm.get('templateId')?.value;
        return this.templates.find(t => t.id === templateId);
    }

    onSubmit() {
        if (this.strategyForm.valid) {
            this.loading = true;
            this.error = '';

            const formValue = this.strategyForm.value;
            const selectedTemplate = this.getSelectedTemplate();

            if (!selectedTemplate) {
                this.error = 'Please select a template';
                this.loading = false;
                return;
            }

            const strategyData = {
                name: formValue.name,
                description: formValue.description,
                code: selectedTemplate.code
            };

            if (this.isEditMode && this.strategyId) {
                this.http.put(`http://localhost:3000/strategies/${this.strategyId}`, strategyData)
                    .subscribe({
                        next: () => {
                            this.router.navigate(['/strategies', this.strategyId]);
                        },
                        error: (error) => {
                            this.error = 'Failed to update strategy';
                            this.loading = false;
                            console.error('Error updating strategy:', error);
                        }
                    });
            } else {
                this.http.post('http://localhost:3000/strategies', strategyData)
                    .subscribe({
                        next: () => {
                            this.router.navigate(['/strategies']);
                        },
                        error: (error) => {
                            this.error = 'Failed to create strategy';
                            this.loading = false;
                            console.error('Error creating strategy:', error);
                        }
                    });
            }
        }
    }

    onCancel() {
        if (this.isEditMode && this.strategyId) {
            this.router.navigate(['/strategies', this.strategyId]);
        } else {
            this.router.navigate(['/strategies']);
        }
    }
} 